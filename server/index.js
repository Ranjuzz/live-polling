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

// Store current poll
let currentQuestion = null;
let answers = {};

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);


  if (currentQuestion) {
    socket.emit('new_question', currentQuestion);
  }

  // When teacher asks a question
  socket.on('ask_question', (questionData) => {
    currentQuestion = questionData;
    answers = {}; // Reset answers
    io.emit('new_question', currentQuestion);
  });

  // When student submits answer
  socket.on('submit_answer', ({ name, answer }) => {
    if (!answers[name]) {
      answers[name] = answer;
      io.emit('poll_update', { totalResponses: Object.keys(answers).length });
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

server.listen(5000, () => {
  console.log('Server running on port 5000');
});
