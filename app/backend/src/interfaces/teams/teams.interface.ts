import { Model } from 'sequelize';

export default interface ITeams extends Model {
  id?: number;
  teamName: string;
}
