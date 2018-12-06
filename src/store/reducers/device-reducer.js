import { LEND_DEViCE,RETURN_DEViCE } from '../actions/device-actions';

const initialState = {  //初始化state
    lendList:[],
    returnList:[]
}
export default function(state = initialState,action){
    switch(action.type){
        case LEND_DEViCE:{
            var add = true    
            state.lendList.forEach((v,i)=>{
                if(action.payload.info.id == v.id){ //已存在 删除
                    add = false
                    state.lendList.splice(i,1)
                }
            })
            if(add){
                state.lendList.push(action.payload.info)//若无 添加
            }
            return state
        }
        case RETURN_DEViCE:{
            var add = true
            state.returnList.forEach((v,i)=>{
                if(action.payload.info.id == v.id){ //已存在 删除
                    add = false
                    state.returnList.splice(i,1)
                }
            })
            if(add){
                state.returnList.push(action.payload.info)//若无 添加
            }
            return state
        }
        default:return state;
    }
}
