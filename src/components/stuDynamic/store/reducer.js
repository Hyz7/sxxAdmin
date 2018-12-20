import * as actionTypes from './actionTypes'

const defaultState={
    stuDynamicList:[]
}

const getStuDynamicList=(state,action)=>{
    return Object.assign({},state,{stuDynamicList:action.result})
}

const update=(state,action)=>{
    return Object.assign({},state,{update:action.result})
}
export default (state = defaultState, action)=>{
    switch(action.type){
        case actionTypes.GET_STU_DYNAMIC_LIST:
            return getStuDynamicList(state,action)
        case actionTypes.GET_UPDATE_LIST:
            return update(state,action)
        default:
            return state
    }
}
