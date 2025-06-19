const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

let currentQuestion = null;
let answers = {};
let participants = {}; // ✅ Global participant map

io.on('connection', (socket) => {
  console.log('✅ New client connected:', socket.id);

  // 🟣 Join chat
  socket.on('join_chat', (name) => {
    participants[socket.id] = name;
    io.emit('participants_update', Object.values(participants));
  });

  // 💬 Receive and broadcast chat messages
  socket.on('send_message', (message) => {
    const sender = participants[socket.id] || 'Anonymous';
    io.emit('new_message', { text: message, sender }); // ✅ send to all, including sender
  });

  // ❌ Clean up on disconnect
  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
    delete participants[socket.id];
    io.emit('participants_update', Object.values(participants));
  });

  // 📤 Send current question to new student
  if (currentQuestion) {
    socket.emit('new_question', currentQuestion);
  }

  // 📣 Teacher asks new question
  socket.on('ask_question', (questionData) => {
    currentQuestion = questionData;
    answers = {};
    io.emit('new_question', currentQuestion);
  });

  // ✅ Student submits answer
  socket.on('submit_answer', ({ name, answer }) => {
    if (!currentQuestion) return;

    const voterId = socket.id;

    if (!answers[voterId]) {
      answers[voterId] = { name, answer };

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
        correctIndex: currentQuestion.correctIndex ?? -1
      });
    }
  });
});

server.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});
