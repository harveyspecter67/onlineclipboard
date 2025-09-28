import {Link} from "react-router-dom";
import './Navbar.css'; // Import the new CSS file

const Navbar = () => {
  return (
   <nav className="navbar">
    <Link to ='/'>Home</Link>
    <Link to ='/register'>Register</Link>
    <Link to ='/login'>Login</Link>
   </nav>
  )
}

export default Navbar
