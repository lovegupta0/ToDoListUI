import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack';
import {setUserData} from "../redux/dataRedux/data_action";
import {connect} from "react-redux";

function AddItem({currentUser,setUserData}) {
  var [data,setData]=React.useState({
    email:currentUser.email,
    body:"",
    done:false
  });

  function handleChange(event){
    var {name,value}=event.target;
      setData(preValue=>{
        return{
          ...preValue,
          [name]:value
        }
      })
  }

  function handleSubmit(event){
    console.log(event);
  if(currentUser!==""){
    axios.post("/api/adddata",data,{crossDomian:true}).then((res)=>{
      setData({
        email:currentUser.email,
        body:"",
        done:false
      });
      console.log(res.data);
      axios.post("/api/getdata?email="+currentUser.email,"",{crossDomain:true}).then((res)=>{
        setUserData(res.data);
    })

     }).catch((error)=>(console.log(error)));
     
  }
  }

  function clear(event){
    setData({
      email:currentUser.email,
      body:"",
      done:false
    });
  }

  return (
    <Stack direction="horizontal" gap={3} className="mb-3">
      <Form.Control className="me-auto" onChange={handleChange} name="body" value={data.body} placeholder="Add your item here..." />
      <Button variant="secondary" onClick={handleSubmit}>Add</Button>
      <div className="vr" />
      <Button variant="outline-danger" onClick={clear}>Reset</Button>
    </Stack>
  );
}

const dispatchData=dispatch=>({
 
  setUserData:data=>dispatch(setUserData(data))
});

const mapStateToProps=state=>({
  currentUser:state.user.currentUser,
})

export default connect(
  mapStateToProps,
  dispatchData
  )(AddItem);
