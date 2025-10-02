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
    const [timeRemaining, setTimeRemaining]= useState(null);
    const [clipCreatedAt, setClipCreatedAt] = useState(null); // New state for createdAt

    // Effect for the countdown timer
    useEffect(() => {
        let timer;
        if (clipCreatedAt) {
            const expirationTime = new Date(clipCreatedAt).getTime() + (2 * 60 * 1000); // 2 minutes in milliseconds

            timer = setInterval(() => {
                const now = new Date().getTime();
                const distance = expirationTime - now;

                if (distance < 0) {
                    clearInterval(timer);
                    setTimeRemaining("Expired!");
                    setData(prevData => ({ ...prevData, content: "" })); // Clear content if expired
                    toast.error("Clip has expired and been deleted!");
                } else {
                    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
                    setTimeRemaining(`${minutes}m ${seconds}s`);
                }
            }, 1000);
        }

        // Cleanup function for the interval
        return () => clearInterval(timer);
    }, [clipCreatedAt]); // Re-run effect when clipCreatedAt changes
    const getData = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/getclip', {key: data.key, Sname: data.Sname, Rname: data.Rname});
            if(response.data.error){
                toast.error(response.data.error)
                setTimeRemaining(null); // Clear timer on error
                setClipCreatedAt(null); // Clear createdAt on error
                setData(prevData => ({ ...prevData, content: "" })); // Clear content on error
            } else {
                setData(prevData => ({ ...prevData, content: response.data.content}));
                setClipCreatedAt(response.data.createdAt); // Set createdAt from backend
                toast.success('Clip retrieved successfully!');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error("Error fetching data.");
            setTimeRemaining(null); // Clear timer on network error
            setClipCreatedAt(null); // Clear createdAt on network error
            setData(prevData => ({ ...prevData, content: "" })); // Clear content on network error
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