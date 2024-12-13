const { Sequelize } = require('sequelize');
const Workout = require('../models/workoutModel');


const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
       host: process.env.DB_HOST,
       dialect: process.env.DB_DIALECT
    }
);

//GET all workouts
const getWorkouts = async (req, res) => {
    const user_id = req.user.id; //set by middleware

    try {
        const workouts = await Workout.findAll({
            where: { user_id }, // filter by user_id
            order: [['createdAt', 'DESC']] // sort by createdAt in descending order
        });
        res.status(200).json(workouts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


//GET a single workout
const getWorkout = async (req,res) => {
    const {id} = req.params;


    const workout = await Workout.findByPk(id);

    if(!workout){
        return res.status(404).json({error:'No such workout'});
    }

    res.status(200).json(workout);
}


//create a new workout
const createWorkout = async (req,res) => {
    const {title,load,reps} = req.body;

    let emptyFields = [];
    
    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error:'Please fill in all the fields!',emptyFields})
    }

    //add doc. to DB
    try{
        const user_id = req.user.id
        const workout = await Workout.create({title,load,reps,user_id});
        res.status(200).json(workout);
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//DELETE a workout
const deleteWorkout = async (req,res) => {
    const {id} = req.params;

    const workout = await Workout.findByPk(id);

    if(!workout){
        return res.status(404).json({error:'No such workout'});
    }else{
        workout.destroy({id:id})
    }

    res.status(200).json(workout)
}

//UPDATE a workout
const updateWorkout = async(req,res) => {
    const {id} = req.params;

    const workout = await Workout.findByPk(id);

    if(!workout){
        return res.status(404).json({error:'No such workout'});
    }else{
        workout.set({
            ...req.body
        }).save();
        
    }

    res.status(200).json(workout)

}



module.exports = {
    getWorkouts,
    getWorkout,
    createWorkout,
    deleteWorkout,
    updateWorkout
}