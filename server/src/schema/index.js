import { SchemaComposer } from 'graphql-compose';

import db from '../utils/db'; // eslint-disable-line no-unused-vars

const schemaComposer = new SchemaComposer();

import { UserQuery, UserMutation } from './user';
import { TournamentQuery, TournamentMutation } from './tournament';

schemaComposer.Query.addFields({
  ...UserQuery,
  ...TournamentQuery
});

schemaComposer.Mutation.addFields({
  ...UserMutation,
  ...TournamentMutation,
});

export default schemaComposer.buildSchema();