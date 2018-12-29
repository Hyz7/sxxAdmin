import * as actionTypes from '../../../store/actionTypes'

const defaultState={
    list:[]
}

const getlist=(state,action)=>{
    return Object.assign({},state,{list:action.result.dataEntities})
}


export default (state = defaultState, action)=>{
    switch(action.type){
        case actionTypes.GET_DOWNLOAD_LIST:
            return getlist(state,action)
        default:
            return state
    }
}
