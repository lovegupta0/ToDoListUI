import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {connect} from "react-redux";

import LoginButton from '../login/LoginButton';
import Signup from '../signup/Signup';
import Profile from '../profile&logout/Profile';

const NavBar=({currentUser})=>{
  const [status,setStatus]=React.useState(false);

  React.useEffect(()=>{
    if(currentUser!==""){
      setStatus(true);
      
    }else{
      setStatus(false);
    }
   
  },[currentUser]);

    return(
        <Navbar bg="light" expand="sm">
        <Container>
          <Navbar.Brand href="#home">TO-DO-List</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">About</Nav.Link>
              
            </Nav>{
              status?<Profile/>:
            <>
            <LoginButton style={{marginRignt:"5px"}} />
            <Signup />
            </>}
          </Navbar.Collapse>
        </Container>
      </Navbar>

    );
}

const mapStateToProps=state=>({
  currentUser:state.user.currentUser
})

export default connect(mapStateToProps)(NavBar);