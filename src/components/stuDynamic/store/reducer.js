import * as actionTypes from './actionTypes'

const defaultState={
    stuDynamicList:[],
    update:''
}

const getStuDynamicList=(state,action)=>{
    return Object.assign({},state,{
        stuDynamicList:action.result.dynamicList,
        pageResult:action.result.pageResult.total,
    })
}

const update=(state,action)=>{
    return Object.assign({},state,{update:action.result})
}
export default (state = defaultState, action)=>{
    switch(action.type){
        case actionTypes.GET_STU_DYNAMIC_LIST:
            return getStuDynamicList(state,action)
        case actionTypes.UPDATE:
            alert('修改成功！')
            return update(state,action)
        default:
            return state
    }
}
