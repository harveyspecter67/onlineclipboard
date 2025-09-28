import { useState } from "react"
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios
import './CopyPage.css'; // Import the new CSS file

export default function CopyPage(){
    const navigate = useNavigate(); // Initialize useNavigate
    const[data,setData]=useState(
        {
            content:"",
            Sname:"",
            Rname:"",
            key: "", // Add key to state
        }
    );
    
    const getData = async (e) => { // Define getData function
        e.preventDefault();
        try {
            const response= await axios.post('/copypage', {key: data.key, Sname: data.Sname, Rname: data.Rname});
            if(response.data.error){
                toast.error(response.data.error)
            } else {
                setData(prevData => ({ ...prevData, content: response.data.clip}));
            }
        } catch (error) {
            console.log(error);
            toast.error("Error fetching data.");
        }
    }

    return(
        <div className="form-container">
            <h2>Retrieve Content</h2>
        <div>
            Copy text from here..
        </div>
        <form onSubmit={getData} className="auth-form"> {/* Change onChange to onSubmit and call getData */}
         <label>Key</label>
        <input type = 'text' placeholder='enter the key' value = {data.key} onChange={(e) => setData({...data,key: e.target.value})}/>
         <label>Your Name (Receiver)</label> {/* Clarify label */}
        <input type = 'text' placeholder='enter your name' value = {data.Rname} onChange={(e) => setData({...data,Rname: e.target.value})}/>
         <label>Sender's Name</label>
        <input type = 'text' placeholder="enter sender's name" value = {data.Sname} onChange={(e) => setData({...data,Sname: e.target.value})}/>
        <button type="submit">Get Data</button>
        </form>
        <div>
            <h3>Content:</h3>
            <p style={{backgroundColor:'black'}}>{data.content}</p> {/* Display content from state */}
        </div>
        </div>
    )
}