import * as actionTypes from './actionTypes'
import axios from 'axios'
import * as Api from '../../../api'
const getList=(result)=>({
    type: actionTypes.GET_STU_DYNAMIC_LIST,
    result,
})
const upload=(result)=>({
    type: actionTypes.GET_UPDATE_LIST,
    result,
})

export const getStuDynamicList=(id,page,pageSize)=>{
    return (dispatch)=>{
        axios.get(Api.GET_NEWS_LIST+'?typeId='+id+'&page='+page+'&size='+pageSize).then(res=>{
            console.log(res)
            dispatch(getList(res.data.dynamicList))
        })
    }
}

export const uploadEditor=(body)=>{
    return (dispatch)=>{
        axios.post(Api.UPLOAD_EDITOR,body).then(res=>{
            dispatch(upload(res.data.success))
        })
    }
}
