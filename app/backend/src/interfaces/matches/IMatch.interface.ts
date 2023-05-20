import ITeams from '../teams/teams.interface';

interface IMatch {
  id: number;
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam: ITeams;
  awayTeam: ITeams;
}

export default IMatch;
