require('dotenv').config();
const cors = require('cors');
const path = require('path');
const express = require('express');
const sequelize = require('./config/sequelize'); 
const db = require('./models'); // Load all models with associations applied


const allowedOrigins = ['https://main.dmh0b2wygl91q.amplifyapp.com'];

//Connect and sync Database
db.sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected.');
    return db.sequelize.sync({ force: false, alter: true }); // Use alter:true for safe schema updates
  })
  .then(() => {
    console.log('Database synced successfully.');
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server running on port ${process.env.PORT || 4000}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });


const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

const app = express();

//allow CORS policy
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

//middleware
app.use(express.json())

app.use((req,res,next) => {
    console.log(req.path,req.method);
    next();
})

//routes
app.use('/api/workouts',workoutRoutes)
app.use('/api/user',userRoutes);

// Serve frontend static files in production to DEPLOY AMPLIFY AWS FRONTEND

/*if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}*/

module.exports = sequelize;





