import "./navbar.css"
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="navbar">
        <div className="navContainer">
            <span className="logo">
                <Link to="/" style={{color:"inherit",textDecoration:"none"}}>

                </Link>
            </span>
            <div className="navItems">
                <button className="navButton">Register</button>
                <button className="navButton">Login</button>
            </div>
        </div>
    </div>
  )
}

export default Navbar