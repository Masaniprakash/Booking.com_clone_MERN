import "./navbar.css"
import {Link} from 'react-router-dom'
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContextFor"

const Navbar = () => {
  const {user,dispatch}=useContext(AuthContext)
//   console.log(user);
    const logout=()=>{
        localStorage.setItem("user", JSON.stringify(null)); 
        dispatch({type:"LOGOUT"})     
    }
    return (
        <div className="navbar">
            <div className="navContainer">
                <span className="logo">
                    <Link to="/" style={{color:"inherit",textDecoration:"none"}}>
                        Massbooking
                    </Link>
                </span>
                {user? <div className="user"><span className="userName">{user.username} </span>
                    <button className="logoutBtn" onClick={logout}>Logout</button>
                </div>:  <div className="navItems">
                    <button className="navButton">Register</button>
                    <button className="navButton">
                        <Link to="/login" style={{color:"inherit",textDecoration:"none"}}>
                            Login
                        </Link>
                    </button>
                </div>}
            </div>
        </div>
    )
}

export default Navbar