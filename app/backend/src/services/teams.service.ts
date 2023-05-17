import { Boom } from '@hapi/boom';
import ITeam from '../interfaces/teams/teams.interface';
import SequelizeTeam from '../database/models/teams.model';
import EnumError from '../enums/error.enum';
import BasedError from '../errors/BasedError.class';

export default class TeamsService {
  private teamsModel = SequelizeTeam;

  static assertIsTeam(object: ITeam): boolean {
    return !!(object.id && object.teamName);
  }

  async findAll(): Promise<ITeam[]> {
    const allTeams = await this.teamsModel
      .findAll();

    if (
      !allTeams.every(TeamsService.assertIsTeam)
      || !allTeams.length
    ) {
      // Controller will forward error to middleware.
      const error = new BasedError(
        'Internal Error',
        EnumError.BAD_IMPLEMENTATION
      );
      throw new Error('Internal Error');
    }

    return allTeams;
  }

  async findById(id: string): Promise<ITeam> {
    const team = await this.teamsModel.findByPk(id);
    
    if (team === null) {
      const error = new BasedError('', EnumError.NOT_FOUND);
      throw error;
    }

    if (!TeamsService.assertIsTeam(team)) {
      const error = new BasedError(
        '',
        EnumError.BAD_IMPLEMENTATION
      );
      
      throw error;
    }

    return team;
  }
}

