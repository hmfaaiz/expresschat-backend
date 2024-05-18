const { Server } = require('socket.io');

let io;

const setupWebSocket = (server) => {
 
  io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  let userCounter = 0;
  console.log("socket1",userCounter)
  io.on('connection', (socket) => {
    
    userCounter+=1;
    console.log("socket2",userCounter)
    console.log('User Connected! ->', userCounter);

    socket.on('disconnect', () => {
      userCounter--;
      console.log('User Disconnected!', userCounter);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    console.log("socket is not started..",io)
  }
  return io;
};

module.exports = { setupWebSocket, getIO };
