import * as actionTypes from './actionTypes'
import axios from 'axios'
import * as Api from '../../../api'
const getList=(result)=>({
    type: actionTypes.GET_NEWS_LIST,
    result,
})
const upload=(result)=>({
    type: actionTypes.GET_NEWS_LIST,
    result,
})
export const getNewsList=(id,page,pageSize)=>{
    return (dispatch)=>{
        axios.get(Api.GET_NEWS_LIST+'?typeId='+id+'&page='+page+'&size='+pageSize).then(res=>{
            console.log(res)
            dispatch(getList(res.data.dynamicList))
            // this.dataSource = new MatTableDataSource(res.data.yourSubArray);
        })
    }
}

export const uploadEditor=(body)=>{
    return (dispatch)=>{
        axios.post(Api.UPLOAD_EDITOR,body).then(res=>{
            console.log(res)
            dispatch(upload(res.data))
        })
    }
}
