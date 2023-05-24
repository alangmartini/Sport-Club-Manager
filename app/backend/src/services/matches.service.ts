import IMatch from '../interfaces/matches/IMatch.interface';
import Matches from '../database/models/matches.model';
import EnumErrorHTTP from '../enums/HTTPerror.enum';
import BasedError from '../errors/BasedError.class';
import IMatchesQuery from '../interfaces/matches/IMatchesQuery.interface';
import Teams from '../database/models/teams.model';
import IUpdateGoalsBody from '../interfaces/matches/IUpdateGoalsBody.interface';
import EnumBusinessRulesError from '../enums/BusinessRulesError.enum';
import INewMatchBody from '../interfaces/matches/INewMatchBody.interface';

type queryParameter = string | undefined | boolean;

function stringToBoolean(str: string): boolean {
  return str.toLocaleLowerCase() === 'true';
}

export default class MatchesService {
  private matchesModel = Matches;
  private teamsModel = Teams;

  static assertIsMatch(object: IMatch): boolean {
    return !!object.id;
  }

  private buildTeamIncludeWhere(team: queryParameter, alias: string) {
    return {
      model: this.teamsModel,
      as: alias,
      attributes: ['teamName'],
      where: team ? { teamName: team } : undefined,
    };
  }

  private buildTeamInclude(alias: string) {
    return {
      model: this.teamsModel,
      as: alias,
      attributes: ['teamName'],
    };
  }

  private constructQuery(
    homeTeamName: queryParameter,
    awayTeamName: queryParameter,
    inProgress: string | undefined,
  ) {
    const boolInProgress = inProgress !== undefined ? stringToBoolean(inProgress) : undefined;

    return {
      where: boolInProgress !== undefined ? { inProgress: boolInProgress } : undefined,
      include: [
        this.buildTeamIncludeWhere(homeTeamName, 'homeTeam'),
        this.buildTeamIncludeWhere(awayTeamName, 'awayTeam'),
      ],
    };
  }

  private async checkTeamExists(teamId: number): Promise<boolean> {
    const team = await this.teamsModel.findByPk(teamId);

    return team !== null;
  }

  async findAllByQuery(query: IMatchesQuery): Promise<IMatch[]> {
    const { homeTeam: homeTeamName, alwayTeam: alwayTeamName } = query;
    const { inProgress } = query;

    const sequelizeQuery = this.constructQuery(homeTeamName, alwayTeamName, inProgress);

    const matches = (await this.matchesModel.findAll(sequelizeQuery)) as IMatch[];

    return matches;
  }

  async findAll(): Promise<IMatch[]> {
    const allMatches = (await this.matchesModel.findAll({
      include: [this.buildTeamInclude('homeTeam'), this.buildTeamInclude('awayTeam')],
    })) as IMatch[];

    if (!allMatches.every(MatchesService.assertIsMatch) || !allMatches.length) {
      const error = new BasedError('Internal Error', EnumErrorHTTP.BAD_IMPLEMENTATION);

      throw error;
    }

    return allMatches;
  }

  async findById(id: string): Promise<IMatch> {
    const match = (await this.matchesModel.findByPk(id)) as IMatch;

    if (match === null) {
      const error = new BasedError('', EnumErrorHTTP.NOT_FOUND);
      throw error;
    }

    if (!MatchesService.assertIsMatch(match)) {
      const error = new BasedError('', EnumErrorHTTP.BAD_IMPLEMENTATION);

      throw error;
    }

    return match;
  }

  async finishMatch(id: string): Promise<number | undefined> {
    const [numberOfAffectedRows] = (await this.matchesModel.update(
      { inProgress: false },
      {
        where: { id },
      },
    )) as [number];

    if (numberOfAffectedRows === 0) {
      const error = new BasedError('Match not found', EnumErrorHTTP.NOT_FOUND);
      throw error;
    }

    return numberOfAffectedRows;
  }

  async updateGoals(id: string, newGoals: IUpdateGoalsBody) {
    const newHomeTeamGoals = newGoals.homeTeamGoals;
    const newAwayTeamGoals = newGoals.awayTeamGoals;

    const [numberOfAffectedRows, updatedMatchArr] = (await this.matchesModel.update(
      {
        homeTeamGoals: newHomeTeamGoals,
        awayTeamGoals: newAwayTeamGoals,
      },
      {
        where: { id },
        returning: true,
      },
    )) as [number, IMatch[]];

    if (numberOfAffectedRows === 0) {
      const error = new BasedError('Match not found', EnumErrorHTTP.NOT_FOUND);
      throw error;
    }

    return updatedMatchArr[0];
  }

  async createMatch(matchData: INewMatchBody): Promise<IMatch> {
    const { awayTeamGoals, awayTeamId, homeTeamGoals, homeTeamId } = matchData;
    const homeTeamExists = await this.checkTeamExists(matchData.homeTeamId);
    const alwayTeamExists = await this.checkTeamExists(matchData.awayTeamId);

    if (!homeTeamExists || !alwayTeamExists) {
      const error = new BasedError('Failed to create match', EnumBusinessRulesError.NO_TEAM_MATCH);
      throw error;
    }

    const newMatch = await this.matchesModel.create({
      awayTeamGoals, awayTeamId, homeTeamGoals, homeTeamId, inProgress: true,
    }) as IMatch;

    if (!newMatch) {
      const error = new BasedError('Failed to create match', EnumErrorHTTP.BAD_IMPLEMENTATION);
      throw error;
    }

    return newMatch;
  }
}
