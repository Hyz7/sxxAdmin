import * as actionTypes from './actionTypes'

const defaultState={
    industryDynamicList:[],
    update:''
}

const getmenulist=(state,action)=>{
    return Object.assign({},state,{
        industryDynamicList:action.result.dynamicList,
        pageResult:action.result.pageResult.total,
    })
}

const update=(state,action)=>{
    return Object.assign({},state,{update:action.result})
}
export default (state = defaultState, action)=>{
    switch(action.type){
        case actionTypes.GET_INDUSTRY_DYNAMIC_LIST:
            return getmenulist(state,action)
        case actionTypes.UPDATE:
            alert('修改成功！')
            return update(state,action)
        default:
            return state
    }
}
