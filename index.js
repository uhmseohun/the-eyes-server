const app = require('express')();

const { createServer } = require('http');
const server = createServer(app);

const socket = require('socket.io');
const io = socket(server);

app.all('/*', (_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});

const {
  onJoinRoom,
  onEyeClosed,
} = require('./functions/socket');

io.on('connection', (socket) => {
  socket.on('joinRoom', onJoinRoom(io, socket));
  socket.on('eyeClosed', onEyeClosed(io, socket));
});

const {
  getRoomMembers,
  getLeaderboard,
  postLeaderboard,
} = require('./functions/rest');

app.get('/room/:roomName/members', getRoomMembers(io));
app.get('/leaderboard', getLeaderboard);
app.post('/leaderboard', postLeaderboard);

server.listen(3000, () => {
  console.log('server is running on *:3000');
});
