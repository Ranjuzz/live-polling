// socket.js
import { io } from 'socket.io-client';

let socket;

export const getSocket = () => {
  if (!socket) {
    socket = io('https://live-polling-i6ij.onrender.com:5000');
  }
  return socket;
};
