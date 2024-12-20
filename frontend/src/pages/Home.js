import { useEffect} from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

//components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";


export default function Home(){
    const {workouts,dispatch} = useWorkoutContext();
    const {user} = useAuthContext();

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/workouts`,{
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            })
            const data = await response.json()

            if (response.ok) {
                dispatch({type:'SET_WORKOUTS',payload:data})
            }
        }

        if(user){
            fetchWorkouts();
        }
        
    },[dispatch,user])
    return (<>
    <div className="home">
        <div className="workouts">
            {workouts && workouts.map((workout) => (
                <WorkoutDetails key={workout.id} workout={workout}/>
            ))}
        </div>
        <WorkoutForm/>
    </div>
    </>)
}