import { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

export default function WorkoutForm(){
    const {dispatch} = useWorkoutContext();
    const {user} = useAuthContext();

    const [title,setTitle] = useState('');
    const [load,setLoad] = useState('');
    const [reps,setReps] = useState('');
    const [error,setError] = useState(null);
    const [emptyFields,setEmptyFields] = useState([]);

    async function handleSubmit(e){
        e.preventDefault();

        if(!user){
            setError('You must be logged in')
            return
        }

        const workout = {title,load,reps}

        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/workouts`,{
            method:'POST',
            body: JSON.stringify(workout),
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Bearer ${user.token}`
            }
        })

        const json = await response.json();

        if(!response.ok){
            setError(json.error);
            setEmptyFields(json.emptyFields || []);
            console.log("Error:", json.error);
            console.log("Empty fields:", json.emptyFields);
        }
        if(response.ok){
            setTitle('');
            setLoad('');
            setReps('');
            setError(null);
            setEmptyFields([]);
            console.log('new workout added',json);
            dispatch({type:'CREATE_WORKOUT',payload:json})
        }
    }


    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a new workout</h3>

            <label>Exercise's title:</label>
            <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={Array.isArray(emptyFields) && emptyFields.includes('title') ? 'error' : ''}
            />

            <label>Load(in kg):</label>
            <input 
            type="number"
            value={load}
            onChange={(e) => setLoad(e.target.value)}
            className={Array.isArray(emptyFields) && emptyFields.includes('load') ? 'error' : ''}
            />

            <label>Reps:</label>
            <input 
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            className={Array.isArray(emptyFields) && emptyFields.includes('reps') ? 'error' : ''}
            />

            <button>Add workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}