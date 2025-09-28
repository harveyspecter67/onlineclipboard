import { useState } from 'react';
import toast from 'react-hot-toast';
// import { v4 as uuidv4 } from 'uuid'; // Import uuid for key generation
import axios from 'axios';
import './PastePage.css'; // Import the new CSS file

export default function PastePage() {
const [data, setData] = useState({
    content:'',
    Sname: '',
    Rname: '',
    key:''
})
const submitText = async(e)=>{
    e.preventDefault()
    const{content, Sname, Rname} = data // Correct destructuring
    try {
        const {data: responseData} = await axios.post('/pastepage',{
           content,
           Sname,
           Rname,
        });
        if(responseData.error){
            toast.error(responseData.error);
        }
        else{
            setData({content:"", Sname:"", Rname:"", key:responseData.key}) // Update state with generated key
            toast.success(`Content pushed with key: ${responseData.key}`);
        }
    } catch (error) {
        console.log(error)
    }
}

return(
    <div className="form-container">
        <h2>Paste Content</h2>
    <div>
        Paste the text here...
    </div>
    <form onSubmit={submitText} className="auth-form">
        <label>Text</label>
        <input type="text" placeholder="start typing here..." value={data.content} onChange={(e) => setData({...data,content: e.target.value})}/>
        <label>From (Sender)</label>
        <input type="text" placeholder="enter your user name here..." value={data.Sname} onChange={(e) => setData({...data,Sname: e.target.value})}/>
        <label>To (Receiver)</label>
        <input type="text" placeholder="enter receiver's user name here..." value={data.Rname} onChange={(e) => setData({...data,Rname: e.target.value})}/>
        <button type="submit">Push</button>
</form>
{data.key && (
    <div>
        <h3>Generated key:</h3>
        <p>{data.key}</p>
        <p>Share this key with the receiver</p>
        </div>
)
}
</div>
);
}