import * as actionTypes from '../actionTypes'

const defaultState={
    bannerList:[],
}

const getList=(state,action)=>{
    return Object.assign({},state,{
        bannerList:action.result
    })
}

export default (state = defaultState, action)=>{
    switch(action.type){
        case actionTypes.GET_BANNER_LIST:
            return getList(state,action)
        default:
            return state
    }
}
