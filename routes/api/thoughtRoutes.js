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
//thoughts
router.route('/').get(getThought).post(createThought);
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
//reactions
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;