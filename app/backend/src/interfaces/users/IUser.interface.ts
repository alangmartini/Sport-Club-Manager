import { Model } from 'sequelize';
import Users from '../../database/models/users.model';

interface IUser extends Model {
  id: number;
  email: string;
  password: string;
  username: string;
  role: string;
}

export default IUser;