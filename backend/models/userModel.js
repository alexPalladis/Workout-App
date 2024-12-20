const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/sequelize');
const validator = require('validator');

class User extends Model {
  static associate(models) {
    // Associate User with Workouts
    User.hasMany(models.Workout, { foreignKey: 'user_id' , as: 'workouts'});
  }
  // Static signup method
  static async signup(email, password) {
     // validation
     if(!email || !password){
        throw Error('All fields must be filled')
     }
     if(!validator.isEmail(email)){
        throw Error('Email is not valid')
     }
     if(!validator.isStrongPassword(password)){
        throw Error('Password not strong enough')
     }

    // Check if the email already exists
    const exists = await User.findOne({ where: { email } });
    
    if (exists) {
      throw new Error('Email already in use');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    // Create and return the user
    const user = await User.create({ email, password: hash });
    return user;
  }

  //static login method
  static async login(email, password){
    if(!email || !password){
      throw Error('All fields must be filled')
   }

   
   const user = await User.findOne({ where: { email } });
    
   if (!user) {
     throw new Error('Incorrect email');
   }

   const match = await bcrypt.compare(password,user.password)

   if(!match){
    throw Error('Incorrect password')
   }

   return user;
  }
}
// Initialize the User model
User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users', 
  }
);

module.exports = User;
