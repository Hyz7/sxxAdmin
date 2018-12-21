import * as actionTypes from './actionTypes'
import axios from 'axios'
import * as Api from '../../../api'
const getList=(result)=>({
    type: actionTypes.GET_NEWS_LIST,
    result,
})

const upload=(result)=>({
    type: actionTypes.UPDATE,
    result,
})

export const uploadUpdate=(updateBody)=>{
    return (dispatch)=>{
        axios.post(Api.UPDATE,updateBody).then(res=>{
            dispatch(upload(res.data.success))
        })
    }
}

export const getNewsList=(id,page,pageSize)=>{
    return (dispatch)=>{
        axios.get(Api.GET_NEWS_LIST+'?typeId='+id+'&page='+page+'&size='+pageSize).then(res=>{
            // let dataSource = new MatTableDataSource(res.data.dynamicList)
            dispatch(getList(res.data))
            // this.dataSource = new MatTableDataSource(res.data.yourSubArray);
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
