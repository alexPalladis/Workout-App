import { createContext, useReducer } from "react";


export const WorkoutsContext= createContext();



export const workoutsReducer = (state,action) => {
    if(action.type === 'SET_WORKOUTS'){
        return {
            workouts : action.payload
        }
    }
    if(action.type === 'CREATE_WORKOUT'){
        return {
            workouts : [action.payload,...state.workouts]
        }
    }
    if(action.type === 'DELETE_WORKOUT'){
        return {
            workouts : state.workouts.filter((workout) => workout.id !== action.payload.id)
        }
    }
    
    return state;

}


export const WorkoutContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(workoutsReducer,{workouts : null});
    return (
    <WorkoutsContext.Provider value={{...state,dispatch}}>
        {children}
    </WorkoutsContext.Provider>)
}