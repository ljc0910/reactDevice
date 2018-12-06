import { combineReducers } from 'redux'  //多个reducer
import deviceReducer from './device-reducer'
import updataReducer from './updata-reducer'
const allReducers = {
    deviceReducer:deviceReducer,
    updataReducer:updataReducer

}
const rootReducer = combineReducers(allReducers);

export default rootReducer;