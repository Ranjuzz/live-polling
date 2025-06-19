import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { randomUUID } from 'crypto';

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

let currentQuestion = null;
let answers = {};
let participants = {};
let questionLocked = false;
let polls = [];
let pollHistory = [];
let questionTimer = null;

io.on('connection', (socket) => {
  console.log('✅ New client connected:', socket.id);

  socket.on('join_chat', ({ name, role }) => {
    participants[socket.id] = { name, role };
    io.emit('participants_update', Object.entries(participants).map(([id, data]) => ({ id, ...data })));

    if (currentQuestion && questionLocked) {
      socket.emit('new_question', currentQuestion);
    }
  });

  socket.on('kick_participant', (socketIdToKick) => {
    io.to(socketIdToKick).emit('kicked_out');
    io.sockets.sockets.get(socketIdToKick)?.disconnect();
  });


  socket.on('send_message', (message, name) => {
    io.emit('new_message', { text: message, sender: name });
  });

  socket.on('disconnect', () => {
    delete participants[socket.id];
    io.emit('participants_update', Object.values(participants));
  });

  socket.on('ask_question', (questionData) => {
    if (questionLocked) {
      socket.emit('question_rejected', 'Previous poll still running.');
      return;
    }

    const newPoll = {
      id: randomUUID(),
      text: questionData.text,
      options: questionData.options,
      correctIndex: questionData.correctIndex ?? -1,
      timer: questionData.timer || 60,
      createdAt: Date.now()
    };

    currentQuestion = newPoll;
    answers = {};
    questionLocked = true;
    polls.push({ ...newPoll, responses: [] });

    io.emit('new_question', currentQuestion);

    questionTimer = setTimeout(() => {
      questionLocked = false;
      io.emit('poll_ended_due_to_time', currentQuestion.id);
    }, newPoll.timer * 1000);
  });

  socket.on('submit_answer', ({ name, answer, questionId }) => {
    if (!currentQuestion || questionId !== currentQuestion.id) return;

    const voterId = socket.id;
    if (answers[voterId]) return;

    answers[voterId] = { name, answer };

    const poll = polls.find(p => p.id === questionId);
    if (poll) {
      poll.responses.push({ name, answer });
    }

    const voteCount = currentQuestion.options.map(() => 0);
    const voteMap = currentQuestion.options.map(() => []);
    const totalVotes = Object.keys(answers).length;

    for (const { name, answer } of Object.values(answers)) {
      const index = currentQuestion.options.indexOf(answer);
      if (index !== -1) {
        voteCount[index]++;
        voteMap[index].push(name);
      }
    }

    const percentages = voteCount.map(count =>
      totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0
    );

    io.emit('poll_results', {
      text: currentQuestion.text,
      options: currentQuestion.options,
      percentages,
      votes: voteMap,
      correctIndex: currentQuestion.correctIndex
    });

    const totalStudents = Object.values(participants).filter(p => p.role === 'student').length;
    if (totalVotes >= totalStudents) {
      questionLocked = false;
      
      const existingIndex = pollHistory.findIndex(p => p.id === currentQuestion.id);

      const newPoll = {
        id: currentQuestion.id,
        text: currentQuestion.text,
        options: currentQuestion.options,
        percentages,
        votes: voteMap,
        correctIndex: currentQuestion.correctIndex,
        timestamp: Date.now()
      };
      
      if (existingIndex !== -1) {
        pollHistory[existingIndex] = newPoll;
      } else {
        pollHistory.push(newPoll);
      }
      
      clearTimeout(questionTimer); 
      io.emit('poll_completed_by_all', currentQuestion.id);
    }
  });
});

app.get('/poll-history', (req, res) => {
  res.json(pollHistory);
});

server.listen(5000, () => {
  // console.log('🚀 Server running on http://localhost:5000');
});
