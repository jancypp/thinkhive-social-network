const { Thoughts, User } = require('../models');

module.exports = {
  // Get all userData
  async getUsers(req, res) {
    try {
      const userData = await User.find();
      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a userData
  async getSingleUser(req, res) {
    try {
      const userData = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!userData) {
        return res.status(404).json({ message: 'No userData with that ID' });
      }

      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a userData
  async createUser(req, res) {
    try {
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a userData
  async deleteUser(req, res) {
    try {
      const userData = await User.findOneAndDelete({ _id: req.params.userId });

      if (!userData) {
        res.status(404).json({ message: 'No userData with that ID' });
      }

      await Thoughts.deleteMany({ _id: { $in: userData.students } });
      res.json({ message: 'User and students deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a userData
  async updateUser(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!userData) {
        res.status(404).json({ message: 'No userData with this id!' });
      }

      res.json(userData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
