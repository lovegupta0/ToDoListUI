import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const Signup=()=>{

    const [show, setShow] = React.useState(false);
    const[userData,setUserData]=React.useState({
        fname:"",
        lname:"",
        email:"",
        password:""

    })
    function handleChange(event){
      var {name,value}=event.target;
      setUserData(preValue=>{
        return{
          ...preValue,
          [name]:value
        }
      })
    }

    function handleSubmit(event){
      axios.post("/api/adduser",userData,{crossDomain:true}).then((res)=>{
        if(res.data==="sucess"){
          setShow(false);
          alert("Congartulation");
        }
      }).catch((error)=>(console.log(error)));
      event.preventDefault();
    }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    return(
        <>
        <Button variant="primary" onClick={handleShow}>
          Signup
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create account</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>First Name</Form.Label>
        <Form.Control type="text" placeholder="Enter first name" name='fname' onChange={handleChange} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicText">
        <Form.Label>Last Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Last name" name='lname' onChange={handleChange} />
      </Form.Group>

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
        Signup
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
}

export default Signup;