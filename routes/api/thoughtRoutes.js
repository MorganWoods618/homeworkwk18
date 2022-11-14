const router = require('express').Router();
const {
  getThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtControllers');
router.route('/').get(getThought).post(createThought);
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
router.route('/:thoughtID/thoughts').post(addReaction);
router.route('/:thoughtID/thoughts/:reactionId').delete(removeReaction);

module.exports = router;