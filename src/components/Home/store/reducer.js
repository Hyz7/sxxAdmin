import * as actionTypes from './actionTypes'

const defaultState={
    newsList:[]
}

const getmenulist=(state,action)=>{
    return Object.assign({},state,{newsList:action.result})
}

export default (state = defaultState, action)=>{
    switch(action.type){
        case actionTypes.GET_NEWS_LIST:
            return getmenulist(state,action)
        default:
            return state
    }
}
