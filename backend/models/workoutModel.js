require('dotenv').config();
const { Model, DataTypes } = require("sequelize")
const sequelize = require('../config/sequelize'); // Ensure this points to your Sequelize


class Workout extends Model {
  static associate(models) {
    // Define association here
    Workout.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}
 
Workout.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reps: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    load: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users', // Match this to your `User` table name
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Workout',
    tableName: 'workouts', // Optional: Explicit table name
  }
);
  
module.exports = Workout;

