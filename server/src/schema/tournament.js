import { Tournament, TournamentTC } from '../models/tournament';

const TournamentQuery = {
  tournamentById: TournamentTC.getResolver('findById'),
  tournamentByIds: TournamentTC.getResolver('findByIds'),
  tournamentOne: TournamentTC.getResolver('findOne'),
  tournamentMany: TournamentTC.getResolver('findMany'),
  tournamentCount: TournamentTC.getResolver('count'),
  tournamentConnection: TournamentTC.getResolver('connection'),
  tournamentPagination: TournamentTC.getResolver('pagination'),
};

const TournamentMutation = {
  tournamentCreateOne: TournamentTC.getResolver('createOne'),
  tournamentCreateMany: TournamentTC.getResolver('createMany'),
  tournamentUpdateById: TournamentTC.getResolver('updateById'),
  tournamentUpdateOne: TournamentTC.getResolver('updateOne'),
  tournamentUpdateMany: TournamentTC.getResolver('updateMany'),
  tournamentRemoveById: TournamentTC.getResolver('removeById'),
  tournamentRemoveOne: TournamentTC.getResolver('removeOne'),
  tournamentRemoveMany: TournamentTC.getResolver('removeMany'),
};

export { TournamentQuery, TournamentMutation };