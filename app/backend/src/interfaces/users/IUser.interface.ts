import { Model } from 'sequelize';

interface IUser extends Model {
  id: number;
  email: string;
  password: string;
  username: string;
  role: string;
}

export default IUser;