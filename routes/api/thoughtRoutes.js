const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  updatedThought,
  createThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/Thoughtscontroller');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).delete(deleteThought).put(updatedThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;
