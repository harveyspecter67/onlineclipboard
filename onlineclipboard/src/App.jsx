
import './App.css';
import {Routes,Route} from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Home from '../src/pages/Home';
import Register from '../src/pages/Register';
import Login from '../src/pages/Login';
import CopyPage  from './pages/CopyPage';
import MidPage from './pages/midpage';
import PastePage from './pages/PastePage';
import axios from 'axios';
import {Toaster} from 'react-hot-toast'

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true

function App() {
  return (
    <>
  <Navbar />
  <Toaster position='bottom-right' toastOptions={{duration: 2000}} />
  {/* Navbar has to stay static , just the content below it has to be changed 
  hence it is not included in the Routes. */}
  <Routes>
    <Route path ='/' element ={<Home />}/>
    <Route path ='/register' element ={<Register />}/>
    <Route path ='/login' element ={<Login />}/>
    <Route path ='/pastepage' element ={<PastePage />}/>
    <Route path ='/copypage' element ={<CopyPage />}/>
    <Route path ='/midpage' element ={<MidPage />}/>
  </Routes>
    </>
  )
}

export default App
