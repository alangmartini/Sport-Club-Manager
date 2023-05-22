import { WhereAttributeHash } from 'sequelize';

interface IMatchesQuery extends WhereAttributeHash {
  homeTeam?: string;
  awayTeam?: string;
  inProgress?: string;
}

export default IMatchesQuery;
