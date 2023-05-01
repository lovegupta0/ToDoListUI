import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { setCurrentUser } from '../redux/userRedux/user_action';
import {setUserData} from "../redux/dataRedux/data_action";
import { connect } from 'react-redux';

import "./login.css";



const LoginButton=({setCurrentUser,setUserData})=>{
    const [show, setShow] = React.useState(false);
    const[user,setUser]=React.useState({
      email:"",
      password:""
    })
    function handleChange(event){
      var {name,value}=event.target;
      setUser(preValue=>{
        return{
          ...preValue,
          [name]:value
        }
      })
    }

    function handleSubmit(event){
     
      axios.post("/api/check?email="+user.email+"&password="+user.password,user,{crossDomain:true}).then((response)=>{
        if(response.data.length===0) return;
        let data=response.data.replace('{',"");
        data=data.replace('}',"").split(',');
        var str={
          fname:data[0].split('=')[1],
          lname:data[1].split('=')[1],
          email:data[2].split('=')[1],
          
        }
        setCurrentUser(str);
        axios.post("/api/getdata?email="+user.email,user,{crossDomain:true}).then((res)=>{
          setUserData(res.data);
        })
      }).catch((error)=>(console.log(error)))
      setShow(false);
      event.preventDefault();
      
    }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    return(
        <>
        <Button variant="primary" className='mr-3' onClick={handleShow}>
          Login
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email' onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Remeber Me" />
      </Form.Group>
      <Button variant="primary" type="submit" className='center1' >
        Signin
      </Button>
    </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
};


const dispatchData=dispatch=>({
  setCurrentUser:user=>dispatch(setCurrentUser(user)),
  setUserData:data=>dispatch(setUserData(data))
});

export default connect(
  null,
  dispatchData
)(LoginButton);