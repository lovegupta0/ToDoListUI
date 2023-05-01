import React from "react";
import {Dropdown} from "react-bootstrap";
import {connect} from "react-redux";
import Logout from "./Logout";

import "./style.css";
const Profile=({currentUser})=>{
    
    const [status,setStatus]=React.useState(false);
    const handleClick=()=>(setStatus(!status));
    return(
        <div className="border_box" >
            <input type="image" className='img1 dropdown drop' onClick={handleClick}  src="user.png" alt='profile' />
        {status?<div>
            <Dropdown.Menu  show>
            <Dropdown.Item eventKey="1"><h6>{currentUser.fname+" "+currentUser.lname}</h6></Dropdown.Item>
            <Dropdown.Item eventKey="2"><h6>Edit Profile</h6></Dropdown.Item>
            <Dropdown.Item eventKey="3"><Logout/></Dropdown.Item>
            </Dropdown.Menu>
        </div>:null
        }
        </div>
    )
}

const mapStateToProps=state=>({
    currentUser:state.user.currentUser
})

export default connect(mapStateToProps)(Profile);