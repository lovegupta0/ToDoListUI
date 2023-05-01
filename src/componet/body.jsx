import React from 'react';
import Task from './task/task.jsx';
import data from './data.js';
import AddItem from "./item_add/AddItem";
import {connect} from "react-redux";
import "./body.css";

const Body=({userData})=>{
    const [arr,setArr]=React.useState([]);
    React.useEffect(()=>{
        if(userData.length>0){
            setArr(userData);
        }else{
            setArr(data);
        }

    },[userData]);
   
    console.log(arr);
    return(
        <div id='box'>
          <AddItem />
    {arr.map((d)=>(<Task key={d.id} id={d.id} email={d.email}  status={d.done} message={d.body}/>))}
    
        </div>
    )
}

const mapStateToProps=state=>({
    userData:state.data.userData
  })
  
  export default connect(mapStateToProps)(Body);
