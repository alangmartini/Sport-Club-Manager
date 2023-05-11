import { DataTypes, Model } from 'sequelize';
import db from '.';

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

Matches.hasMany
export default Matches;
