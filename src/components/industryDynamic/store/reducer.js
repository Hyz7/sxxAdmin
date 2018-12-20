import * as actionTypes from './actionTypes'

const defaultState={
    industryDynamicList:[]
}

const getmenulist=(state,action)=>{
    return Object.assign({},state,{industryDynamicList:action.result})
}

const update=(state,action)=>{
    return Object.assign({},state,{update:action.result})
}
export default (state = defaultState, action)=>{
    switch(action.type){
        case actionTypes.GET_INDUSTRY_DYNAMIC_LIST:
            return getmenulist(state,action)
        case actionTypes.GET_UPDATE_LIST:
            return update(state,action)
        default:
            return state
    }
}
