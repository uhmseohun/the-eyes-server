const app = require('express')();

const { createServer } = require('http');
const server = createServer(app);
const bodyParser = require('body-parser');

const socket = require('socket.io');
const io = socket(server);

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/the-eyes', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.all('/*', (_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With');
  next();
});
app.use(bodyParser.json());

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
  createLeaderboard,
} = require('./functions/rest');

app.get('/room/:roomName/members', getRoomMembers(io));
app.get('/leaderboard', getLeaderboard);
app.post('/leaderboard', createLeaderboard);

server.listen(3000, () => {
  console.log('server is running on *:3000');
});
