require('dotenv').config();
const path = require('path');
const express = require('express');
const sequelize = require('./config/sequelize'); 
const User = require('./models/userModel'); // Import the User model

const PORT = process.env.PORT

sequelize.authenticate().then(() => {
   
   //listen for requests
   app.listen(PORT,() => {
   console.log('connected to DB and listening on port',PORT)
})
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});
// Sync database
sequelize.sync({ force: false}) 
  .then(() => {
    console.log("Database synced successfully");
    
  });


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
app.use('/api/user',userRoutes);

// Serve frontend static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

module.exports = sequelize;





