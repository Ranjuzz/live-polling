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

io.on('connection', (socket) => {
  console.log('✅ New client connected:', socket.id);

  if (currentQuestion) {
    console.log('👉 Sending current question to new student');
    socket.emit('new_question', currentQuestion);
  }

  socket.on('ask_question', (questionData) => {
    currentQuestion = questionData;
    answers = {};
    console.log('📣 Teacher asked question:', questionData);
    io.emit('new_question', currentQuestion);
  });

  socket.on('submit_answer', ({ name, answer }) => {
    const voterId = socket.id; // Unique per tab
  
    if (!answers[voterId]) {
      answers[voterId] = { name, answer };
  
      // Count all answers
      const totalVotes = Object.keys(answers).length;
      const voteCount = currentQuestion.options.map(() => 0);
      const voteMap = currentQuestion.options.map(() => []);
  
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
  
      const correctIndex = currentQuestion.correctIndex ?? -1;
  
      io.emit('poll_results', {
        text: currentQuestion.text,
        options: currentQuestion.options,
        percentages,
        votes: voteMap,
        correctIndex,
      });
    }
  });
  
  

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected:', socket.id);
  });
});

server.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});
