const { ObjectId } = require('mongoose').Types;
const { Thoughts, User } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughtss(req, res) {
    try {
      const thoughts = await Thoughts.find();

      const thoughtObj = {
        thoughts,
      };

      res.json(thoughtObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single thought
  async getSingleThoughts(req, res) {
    try {
      const thought = await Thoughts.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' })
      }

      res.json({
        thought,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new thought
  async createThoughts(req, res) {
    try {
      const thought = await Thoughts.create(req.body);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a thought and remove them from the course
  async deleteThoughts(req, res) {
    try {
      const thought = await Thoughts.findOneAndRemove({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No such thought exists' });
      }

      const course = await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!course) {
        return res.status(404).json({
          message: 'Thoughts deleted, but no user found',
        });
      }

      res.json({ message: 'Thoughts successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add an reaction to a thought
  async addReaction(req, res) {
    console.log('You are adding an reaction');
    console.log(req.body);

    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID :(' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove reaction from a thought
  async removeReaction(req, res) {
    try {
      const thought = await Thoughts.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID :(' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
