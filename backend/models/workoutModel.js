require('dotenv').config();

const { Sequelize, DataTypes } = require("sequelize")


const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
     host: process.env.DB_HOST,
     dialect: process.env.DB_DIALECT
  }
);

   sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
    //listen for requests
    app.listen(process.env.PORT,() => {
    console.log('connected to DB and listening on port',process.env.PORT)
 })
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
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
    }

  }
    
 });


 sequelize.sync().then(() => {
    console.log('Workout table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

 module.exports = sequelize.model('workouts',Workouts);

