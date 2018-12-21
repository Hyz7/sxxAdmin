import * as actionTypes from './actionTypes'

const defaultState={
    newsList:[],
    update:''
}

const getmenulist=(state,action)=>{
    return Object.assign({},state,{newsList:action.result})
}

const update=(state,action)=>{
    return Object.assign({},state,{update:action.result})
}
/*const updateBody=()=>{
    return Object.assign({},state,{update:action.result})
}*/
export default (state = defaultState, action)=>{
    switch(action.type){
        case actionTypes.GET_NEWS_LIST:
            return getmenulist(state,action)
        /*case actionTypes.GET_UPDATE_LIST:
            return update(state,action)*/
        case actionTypes.UPDATE:
            alert('修改成功！')
            return update(state,action)
        default:
            return state
    }
}
