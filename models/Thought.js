const { Schema, Types, model } = require("mongoose");
const formatDate = require("../utils/date");

const reactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  username: {
    type: String,
    required: true,
  },
  reactionText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => formatDate(timestamp),
  },
});

const thoughtSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => formatDate(timestamp),
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: { virtuals: true, getters: true },
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
