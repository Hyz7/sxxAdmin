import * as actionTypes from '../actionTypes'

const defaultState={
    courseList:[],
    addStatus:false
}

const getlist=(state,action)=>{
    return Object.assign({},state,{
        addStatus:action.success
    })
}
const getCourseList=(state,action)=>{
    return Object.assign({},state,{
        courseList:action.result
    })
}

const deleteInfo=(state,action)=>{
    return Object.assign({},state,{

    })
}
export default (state = defaultState, action)=>{
    switch(action.type){
        case actionTypes.ADD_COURSE_INFO:
            return getlist(state,action)
        case actionTypes.GET_COURSE_LIST:
            return getCourseList(state,action)
        default:
            return state
    }
}
