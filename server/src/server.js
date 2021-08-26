import dotenv from 'dotenv';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

import mongoose from 'mongoose';

import './utils/db';
import schema from './schema';

dotenv.config();

const app = express();

const startApolloServer = async () => {
  const server = new ApolloServer({
    schema,
    cors: true,
    playground: (process.env.NODE_ENV === 'development'),
    introspection: true,
    tracing: true,
    path: '/',
    context: ({ req }) => {
      let authenticated = false
      let userId = null;
      // Get the user token from the headers.
      const token = req.headers?.authorization?.replace('Bearer ', '') || '';

      if(token) {
        let decodedToken;
        try {
          decodedToken = jwt.verify(token, process.env.JWT_SECRET);
          authenticated = true;
          userId = decodedToken.userId;
        } catch(err) {
          authenticated = false;
        }
      }

      // Add the user to the context
      return { authenticated, userId }
    },
  });

  await server.start().catch((err) => throw err);

  server.applyMiddleware({
    app,
    path: '/',
    cors: true,
    onHealthCheck: () =>
      // eslint-disable-next-line no-undef
      new Promise((resolve, reject) => {
        if (mongoose.connection.readyState > 0) {
          resolve();
        } else {
          reject();
        }
      }),
  });
}


startApolloServer().then(
  () => {
    app.listen({ port: process.env.PORT }, () => {
      console.log(`🚀 Server listening on port ${process.env.PORT}`);
      console.log(`😷 Health checks available at ${process.env.HEALTH_ENDPOINT}`);
    });
  }).catch(
  (err) => {
    console.log(err);
  }
)

