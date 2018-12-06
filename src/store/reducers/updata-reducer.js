import {UPDATA} from './../actions/updata-actions'
const initialState = {  //初始化state
    bol:false
}
export default function(state = initialState,action){
    switch(action.type){
        case UPDATA:{
            state.bol = action.payload.bol
             return state
        }
        default:return state
    }
}
