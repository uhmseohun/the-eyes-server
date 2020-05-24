exports.getRoomMembers = (io) => (req, res, next) => {
  const { roomName } = req.params;
  const members = io.sockets.adapter.rooms[roomName];
  res.json({ members });
};

exports.getLeaderboard = (req, res, next) => {};

exports.postLeaderboard = (req, res, next) => {};
