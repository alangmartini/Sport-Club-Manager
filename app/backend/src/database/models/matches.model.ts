import { DataTypes, Model } from 'sequelize';
import db from '.';
import Teams from './teams.model';

class Matches extends Model {
  private homeTeamId!: number;
  private homeTeamGoals!: number;
  private awayTeamId!: number;
  private awayTeamGoals!: number;
  private inProgress!: boolean;
}

Matches.init({
  homeTeamId: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Matches',
  tableName: 'matches',
  timestamps: false,
});

Matches.belongsTo(Teams, {
  foreignKey: 'id',
  as: 'homeTeam',
});

Matches.belongsTo(Teams, {
  foreignKey: 'id',
  as: 'awayTeam',
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

export default Matches;
