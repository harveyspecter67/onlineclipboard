import {Link} from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav>
        <Link to='/'>Home</Link>
        <Link to='/register'>Register</Link>
        <Link to='/login'>Login</Link>
        <Link to='/pastepage'>Paste</Link> {/* Add Paste link */}
        <Link to='/copypage'>Copy</Link>   {/* Add Copy link */}
        <Link to='/about'>About</Link>     {/* Add About link */}
    </nav>
  )
}
