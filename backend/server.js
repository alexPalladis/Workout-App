require('dotenv').config();

const sequelize = require('./config/sequelize'); 
const User = require('./models/userModel'); // Import the User model


sequelize.authenticate().then(() => {
   
   //listen for requests
   app.listen(process.env.PORT,() => {
   console.log('connected to DB and listening on port',process.env.PORT)
})
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

// Sync database
sequelize.sync({ force: false}) 
  .then(() => {
    console.log("Database synced successfully");
    
  });

const express = require('express');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

//express app
const app = express();

//middleware
app.use(express.json())

app.use((req,res,next) => {
    console.log(req.path,req.method);
    next();
})

//routes
app.use('/api/workouts',workoutRoutes)
app.use('/api/user',userRoutes)

module.exports = sequelize;





