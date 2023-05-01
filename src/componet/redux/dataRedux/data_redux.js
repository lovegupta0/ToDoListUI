const INITIAL_STATE={
    userData:[]
};

const dataReducer=(state=INITIAL_STATE,action)=>{
    
    switch (action.type) {
        case "SET_USER_DATA":
            return{
                ...state,
                userData:action.payload
            };
    
        default:
            return state;
    }
}

export default dataReducer;