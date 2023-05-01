import React from 'react';
import Card from 'react-bootstrap/Card';
import "./task.css";
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import {setUserData} from "../redux/dataRedux/data_action";
import { connect } from 'react-redux';
const Task=({setUserData,id,message,email,status})=>{
   
    function updateDone(event){
        console.log(id);
        axios.post("/api/done?done="+true+"&id="+id,"",{crossDomain:true}).then((res)=>{
            console.log(res.data);
            axios.post("/api/getdata?email="+email,"",{crossDomain:true}).then((res)=>{
                setUserData(res.data);
            })
        })
    }

    function deleteData(event){
        axios.post("/api/delete?id="+id,"",{crossDomain:true}).then((res)=>{
            console.log(res.data);
            axios.post("/api/getdata?email="+email,"",{crossDomain:true}).then((res)=>{
                setUserData(res.data);
            })
        })
    }

    function updateBody(event){
        axios.post("/api/body?body=true&id="+id,"",{crossDomain:true}).then((res)=>{
            console.log(res.data);
        })
    }

    return(
        <Card className='mb-3'>
          
        <Card.Body id={id}>
            <Table striped>
                <tbody>
                    <tr>
                        <td style={{width:"90%"}}>
                            {message}
                        </td>
                        <td>
                       {status===true?null:<input type="image" className='img mr-3 outline-primary btn-primary' onClick={updateDone}  src="check.svg" alt='check' />}
                        <input type="image" className='img' src="minus.svg" alt='minus' onClick={deleteData} />
                        </td>
                    </tr>
                </tbody>
            </Table> 
        </Card.Body>
      </Card>
    )
}

const dispatchData=dispatch=>({
    setUserData:data=>dispatch(setUserData(data))
  });
  
  export default connect(
    null,
    dispatchData
  )(Task);