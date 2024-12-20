require('dotenv').config();
const { Sequelize, DataTypes } = require("sequelize")
const sequelize = new Sequelize(process.env.JAWSDB_URL, {
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // This depends on your database's SSL configuration
    },
  },
});
 
const Workouts = sequelize.define("workouts", {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reps: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    load: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'users', 
        key: 'id'       
    },
    allowNull: false,
  }
});

// Define the association (if necessary)
Workouts.associate = (models) => {
  Workouts.belongsTo(models.User, {
    foreignKey: 'user_id',
    as: 'user', // Alias for the relation
  });
};
// Connect to the database and sync models
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');

    sequelize.sync({ alter: true }) // Use alter:true to ensure the table is updated without data loss
      .then(() => {
        console.log('Database synced successfully!');
      })
      .catch((error) => {
        console.error('Unable to sync database:', error);
      });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });
  
module.exports = sequelize.model('workouts',Workouts);

