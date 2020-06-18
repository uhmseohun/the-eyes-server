const { RecordModel } = require('../models')

exports.getRoomMembers = (io) => (req, res, next) => {
  const { roomName } = req.params;
  const members = io.sockets.adapter.rooms[roomName];
  res.json({ members });
};

exports.getLeaderboard = async (req, res, next) => {
  const records = await RecordModel.find({}).sort('-time').limit(10)
  res.json({ records })
};

exports.createLeaderboard = async (req, res, next) => {
  const { name, time } = req.body;
  const newRecord = await RecordModel.create({ name, time });
  res.json({ record: newRecord });
}
