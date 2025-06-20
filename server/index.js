import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { randomUUID } from 'crypto';
import { promises as fs } from 'fs';
import path from 'path';

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const HISTORY_FILE = path.join(process.cwd(), 'pollHistory.json');

let currentQuestion = null;
let answers = {};
let participants = {};
let questionLocked = false;
let polls = [];
let questionTimer = null;
let eligibleStudentIds = new Set();

const savePollToFile = async (poll) => {
  try {
    let existing = [];
    try {
      const data = await fs.readFile(HISTORY_FILE, 'utf8');
      existing = JSON.parse(data);
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }

    existing.push(poll);
    await fs.writeFile(HISTORY_FILE, JSON.stringify(existing, null, 2));
    console.log('✅ Poll saved to file');
  } catch (err) {
    console.error('❌ Error saving poll to file:', err);
  }
};

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

    eligibleStudentIds = new Set(
      Object.entries(participants)
        .filter(([_, data]) => data.role === 'student')
        .map(([id]) => id)
    );

    currentQuestion = newPoll;
    answers = {};
    questionLocked = true;
    polls.push({ ...newPoll, responses: [] });

    io.emit('new_question', currentQuestion);

    // ⏳ Timer ends: then save the poll
    questionTimer = setTimeout(async () => {
      questionLocked = false;

      const voteCount = currentQuestion.options.map(() => 0);
      const voteMap = currentQuestion.options.map(() => []);

      for (const { name, answer } of Object.values(answers)) {
        const index = currentQuestion.options.indexOf(answer);
        if (index !== -1) {
          voteCount[index]++;
          voteMap[index].push(name);
        }
      }

      const totalVotes = Object.keys(answers).length;
      const percentages = voteCount.map(count =>
        totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0
      );

      const finalPoll = {
        id: currentQuestion.id,
        text: currentQuestion.text,
        options: currentQuestion.options,
        percentages,
        votes: voteMap,
        correctIndex: currentQuestion.correctIndex,
        timestamp: Date.now()
      };

      await savePollToFile(finalPoll);

      io.emit('poll_completed_by_all', currentQuestion.id);
    }, newPoll.timer * 1000);
  });

  socket.on('submit_answer', ({ name, answer, questionId }) => {
    if (!currentQuestion || questionId !== currentQuestion.id || !questionLocked) return;

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
  });
});

app.get('/poll-history', async (req, res) => {
  try {
    const data = await fs.readFile(HISTORY_FILE, 'utf8');
    const parsed = JSON.parse(data);
    res.json(parsed);
  } catch (err) {
    if (err.code === 'ENOENT') {
      res.json([]);
    } else {
      res.status(500).json({ error: 'Failed to read poll history' });
    }
  }
});

server.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});
