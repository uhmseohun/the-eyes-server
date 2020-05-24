exports.onJoinRoom = (io, socket) => (roomKey) => {
  io.to(roomKey).emit('newUser');
  socket.join(roomKey);
  socket.roomKey = roomKey;
};

exports.onEyeClosed = (io, socket) => (time) => {
  const roomKey = Object.keys(socket.rooms)[0];
  io.to(roomKey).emit('eyeClosed', time);
};
