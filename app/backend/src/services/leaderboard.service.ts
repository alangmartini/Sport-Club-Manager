import IMatch from '../interfaces/matches/IMatch.interface';
import Matches from '../database/models/matches.model';
import Teams from '../database/models/teams.model';
import ITeams from '../interfaces/teams/teams.interface';
import IHomeLeaderboard from '../interfaces/leaderboard/leaderboard.interface';

const emptyTotal = {
  name: 'Corinthians',
  totalPoints: 0,
  totalGames: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0,
};

function sumToTotal(
  arrOfGames: Array<IMatch>,
  oldTotal: IHomeLeaderboard,
  homeOrAway: string,
): IHomeLeaderboard {
  const total = { ...oldTotal };
  const propRepresentTeam = homeOrAway === 'home' ? 'homeTeamGoals' : 'awayTeamGoals';
  const propRepresentOponent = homeOrAway === 'home' ? 'awayTeamGoals' : 'homeTeamGoals';

  arrOfGames.forEach((gameHome) => {
    total.totalPoints += gameHome[propRepresentTeam];
    total.goalsFavor += gameHome[propRepresentTeam];
    total.goalsOwn += gameHome[propRepresentOponent];
    total.totalGames += 1;
    total.totalVictories += gameHome[propRepresentTeam] > gameHome[propRepresentOponent] ? 1 : 0;
    total.totalDraws += gameHome[propRepresentTeam] === gameHome[propRepresentOponent] ? 1 : 0;
    total.totalLosses += gameHome[propRepresentTeam] < gameHome[propRepresentOponent] ? 1 : 0;
  });

  return total;
}

export default class leaderService {
  private matchesModel = Matches;
  private teamsModel = Teams;

  async findAll(): Promise<IHomeLeaderboard[]> {
    const allTeams = (await this.teamsModel.findAll()) as ITeams[];

    const allMatches = (await this.matchesModel.findAll()) as IMatch[];

    const leaderboard = allTeams.map((team) => {
      let total: IHomeLeaderboard = { ...emptyTotal };
      total.name = team.teamName;

      const allGamesHome: Array<IMatch> = allMatches.filter(
        (match) => match.homeTeamId === team.id && match.inProgress === false,
      );
      const allGamesAway: Array<IMatch> = allMatches.filter(
        (match) => match.awayTeamId === team.id && match.inProgress === false,
      );

      total = sumToTotal(allGamesHome, total, 'home');
      total = sumToTotal(allGamesAway, total, 'away');

      return total;
    });

    return leaderboard;
  }
}
