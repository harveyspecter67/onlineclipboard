import { useState } from "react"
import axios from 'axios';
import {toast} from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import './Login.css'; // Import the new CSS file

export default function Login() {
  const navigate = useNavigate()
const [data, setData] = useState(
  {
    email : '',
    password: '',
  })

const loginUser =  async (e) => {
e.preventDefault()
const {email,password} = data 
try {
  const {data} = await axios.post('/login', {
    email,
    password
  });
  if(data.error){
    console.log('error in password')
    toast.error(data.error);
  }
  else{
    setData({email:'',password:''})
     navigate('/midpage')
  }

} catch (error) {
  console.log(error)
}
}

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={loginUser} className="auth-form">
        <label>Email</label>
        <input type = 'email' placeholder='enter email...' value = {data.email} onChange={(e) => setData({...data,email: e.target.value})}/>
        <label>Password</label>
        <input type = 'password' placeholder='enter password...'value = {data.password} onChange={(e) => setData({...data,password: e.target.value})}/>
      <button type='submit'>Login</button>
      </form>
       </div>
  )
}


