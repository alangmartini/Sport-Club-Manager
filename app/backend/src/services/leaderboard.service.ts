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
  goalsBalance: 0,
  efficiency: 0,
};

function calculateEfficiency(P: number, J: number): number {
  const aproveitamento = (P / (J * 3)) * 100;
  return parseFloat(aproveitamento.toFixed(2));
}

function sumToTotal(
  arrOfGames: Array<IMatch>,
  oldTotal: IHomeLeaderboard,
  homeOrAway: string,
): IHomeLeaderboard {
  const total = { ...oldTotal };
  const selfGoals = homeOrAway === 'home' ? 'homeTeamGoals' : 'awayTeamGoals';
  const oponentGoals = homeOrAway === 'home' ? 'awayTeamGoals' : 'homeTeamGoals';

  arrOfGames.forEach((gameHome) => {
    total.totalPoints += gameHome[selfGoals] > gameHome[oponentGoals] ? 3 : 0;
    total.totalPoints += gameHome[selfGoals] === gameHome[oponentGoals] ? 1 : 0;

    total.goalsFavor += gameHome[selfGoals];
    total.goalsOwn += gameHome[oponentGoals];


    total.totalGames += 1;

    total.totalVictories += gameHome[selfGoals] > gameHome[oponentGoals] ? 1 : 0;
    total.totalDraws += gameHome[selfGoals] === gameHome[oponentGoals] ? 1 : 0;
    total.totalLosses += gameHome[selfGoals] < gameHome[oponentGoals] ? 1 : 0;
  });

  return total;
}

function sortLeaderboard(leaderboard: IHomeLeaderboard[]): IHomeLeaderboard[] {
  return leaderboard.sort((a, b) => {
    if (a.totalPoints !== b.totalPoints) {
      // Ordena por total de pontos (decrescente)
      return b.totalPoints - a.totalPoints;
    } if (a.totalVictories !== b.totalVictories) {
      // Em caso de empate, ordena por total de vitórias (decrescente)
      return b.totalVictories - a.totalVictories;
    } if (a.goalsBalance !== b.goalsBalance) {
      // Se ainda empatado, ordena por saldo de gols (decrescente)
      return b.goalsBalance - a.goalsBalance;
    }
    // Se ainda empatado, ordena por gols a favor (decrescente)
    return b.goalsFavor - a.goalsFavor;
  });
}

export default class leaderService {
  private matchesModel = Matches;
  private teamsModel = Teams;

  async findAll(): Promise<IHomeLeaderboard[]> {
    const allTeams = (await this.teamsModel.findAll()) as ITeams[];
    console.log('allTeams is:', allTeams.map((a) => a.dataValues));

    const allMatches = ((await this.matchesModel.findAll()) as IMatch[]);

    let leaderboard = allTeams.map((team) => {
      let total: IHomeLeaderboard = { ...emptyTotal };
      total.name = team.teamName;

      const allGamesHome: Array<IMatch> = allMatches
      .filter((match) => match.homeTeamId === team.id && match.inProgress === false);
      
      const allGamesAway: Array<IMatch> = allMatches
      .filter((match) => match.awayTeamId === team.id && match.inProgress === false);
      if (team.teamName === 'Corinthians') {
        console.log('allGamesHome is:', allGamesHome.map((a) => a.dataValues));
        console.log('allGamesAway is:', allGamesAway.map((b) => b.dataValues));
      }
      total = sumToTotal(allGamesHome, total, 'home');
      total = sumToTotal(allGamesAway, total, 'away');

      total.goalsBalance = total.goalsFavor - total.goalsOwn;
      total.efficiency = calculateEfficiency(total.totalPoints, total.totalGames);

      if (team.teamName === 'Corinthians') { console.log(total); }
      return total;
    });

    leaderboard = sortLeaderboard(leaderboard);
    return leaderboard;
  }
}
