import {combineReducers} from 'redux';
import {persistReducer} from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";
import userReducer from './userRedux/user_redux';
import dataReducer from './dataRedux/data_redux';




const persistConfig={
    key:"root",
    storage:storageSession,
    whitelist:['user','data']
}

const rootReducer=combineReducers({
    user:userReducer,
    data:dataReducer
})

export default persistReducer(persistConfig,rootReducer);