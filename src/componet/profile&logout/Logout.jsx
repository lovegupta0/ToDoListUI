import React from "react";
import { setCurrentUser } from '../redux/userRedux/user_action';
import {setUserData} from "../redux/dataRedux/data_action";
import { connect } from 'react-redux';


function Logout({setCurrentUser,setUserData}){
  
    function handleClick(){
      setCurrentUser("");
      setUserData([]);
        
    }

    return(
        <h6 onClick={handleClick}>Logout</h6>
    )

}

const dispatchData=dispatch=>({
    setCurrentUser:user=>dispatch(setCurrentUser(user)),
    setUserData:data=>dispatch(setUserData(data))
  });
  
  export default connect(
    null,
    dispatchData
  )(Logout);