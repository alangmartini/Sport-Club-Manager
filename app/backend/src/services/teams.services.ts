import { Boom } from '@hapi/boom';
import ITeam from '../interfaces/teams/teams.interface';
import SequelizeTeam from '../database/models/teams.model';
import EnumError from '../Enums/error.enum';

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
      console.log('im here');
      
      // Controller will forward error to middleware.
      const error = new Error('Internal Error');
      error.name = EnumError.badImplementation;
      throw new Error('Internal Error');
    }

    return allTeams;
  }
}

