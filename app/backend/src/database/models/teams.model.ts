import { DataTypes, Model } from 'sequelize';
import db from '.';
import Matches from './matches.model';

class Teams extends Model {
  id!: number;
  teamName!: string;
}

Teams.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  teamName: DataTypes.STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Teams',
  tableName: 'teams',
  timestamps: false,
});

Teams.hasMany(Matches, {
  sourceKey: 'id',
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});

Teams.hasMany(Matches, {
  sourceKey: 'id',
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

Matches.belongsTo(Teams, {
  targetKey: 'id',
  foreignKey: 'homeTeamId',
  as: 'homeTeam',
});

Matches.belongsTo(Teams, {
  targetKey: 'id',
  foreignKey: 'awayTeamId',
  as: 'awayTeam',
});

export default Teams;
