import mongoose from 'mongoose';
import {composeWithMongoose} from "graphql-compose-mongoose";
import {User} from "./user";

export const tournament = new mongoose.Schema(
  {
    mode: {
      type: String,
      enum: ["solo", "duo", "trio"],
      require: true
    },
    startTime: {
      type: Date,
      require: true
    },
    scoring: {
      type: String,
      require: true
    },
    prize: {
      type: Number,
      require: true
    },
  },
  {
    collection: 'tournaments',
    timestamps: true,
  }
);

export const Tournament =  mongoose.model("Tournament", tournament);
export const TournamentTC = composeWithMongoose(Tournament);