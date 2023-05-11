import { DataTypes, Model } from 'sequelize';
import db from '.';

class Users extends Model {
  private id!: number;
  private username!: string;
  private role!: string;
  private email!: string;
  private password!: string;
}

Users.init({
  id: {
    type: DataTypes.NUMBER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  username: DataTypes.STRING,
  role: DataTypes.STRING,
  email: DataTypes.STRING,
  password: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Users',
  tableName: 'users',
  timestamps: false,
});

export default Users;
