import { useState } from "react"
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom"
import './Register.css'; // Import the new CSS file
export default function Register(){
  const navigate = useNavigate()
const [data,setData] = useState({
  name :'',
  email : '',
  password: '',
})

  const registerUser = async (e) => {
    e.preventDefault()
    console.log('RegisterUser function called!');
    console.log('Data before API call:', data);

    const{name,email,password} = data
    try {
      const {data: responseData} = await axios.post('/register', {name,email,password})
    if(responseData.error){
      toast.error(responseData.error)
    }
    else{
      setData({name: '', email: '', password: ''}) // To empty the form after successful login 
      toast.success('Registration successful. Please login.') // Changed toast message
      navigate('/login')
    }
  }
    catch (error) {
      console.error('API call error:', error);
      
    }
  }

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={registerUser} className="auth-form">
        <label>Name</label>
        <input type = 'text' placeholder='enter name...' value = {data.name || ''} onChange={(e) => setData({...data,name: e.target.value})}/>
        <label>Email</label>
        <input type = 'email' placeholder='enter email...' value = {data.email||''} onChange={(e) => setData({...data,email: e.target.value})}/>
        <label>Password</label>
        <input type = 'password' placeholder='enter password...' value = {data.password || ''} onChange={(e) => setData({...data,password: e.target.value})}/>
      <button type='submit' >SUBMIT</button>
      </form>
    </div>
  )
}