const { User, Thought } = require('../models');
const thoughtController = {
//all thoughts
    getThought(req, res) {
    Thought.find()
      .then((dbThoughtData) => {
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .populate('reactions')
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => {
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {$set: req.body,},
      {
        runValidators: true,
        new: true,
      }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
//delete thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((dbThoughtData) => {
        // if (!dbThoughtData) {
        //   return res.status(404).json({ message: 'No thought with this id!' });
        // }
        res.json(dbThoughtData)
        console.log("not working")
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //add reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body } }, { new: true })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  //remove reaction
  removeReaction(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $pull: { reactions:{reactionId: req.params.reactionId} } }, { new: true })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};
module.exports = thoughtController;