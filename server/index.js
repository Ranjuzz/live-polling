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
let participants = {}; 

io.on('connection', (socket) => {
  console.log('✅ New client connected:', socket.id);

  socket.on('join_chat', ({ name, role }) => {
    participants[socket.id] = { name, role };
    io.emit('participants_update', Object.entries(participants).map(([id, data]) => ({ id, ...data })));
  });

  socket.on('kick_participant', (socketIdToKick) => {
    io.to(socketIdToKick).emit('kicked_out');
    io.sockets.sockets.get(socketIdToKick)?.disconnect();
  });
  

  socket.on('send_message', (message, name) => {
    const sender = name;
    io.emit('new_message', { text: message, sender }); 
  });

  socket.on('disconnect', () => {
    delete participants[socket.id];
    io.emit('participants_update', Object.values(participants));
  });

 
  if (currentQuestion) {
    socket.emit('new_question', currentQuestion);
  }

  socket.on('ask_question', (questionData) => {
    currentQuestion = questionData;
    answers = {};
    io.emit('new_question', currentQuestion);
  });

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
