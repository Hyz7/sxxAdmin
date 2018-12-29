import * as actionTypes from '../../../store/actionTypes'
import axios from 'axios'
import * as Api from '../../../api'
const getList=(result)=>({
    type: actionTypes.GET_DOWNLOAD_LIST,
    result,
})

export const getDownloadList=()=>{
    return (dispatch)=>{
        axios.get(Api.GET_DOWNLOAD_INFO).then(res=>{
            console.log(res.data)
            dispatch(getList(res.data))
        })
    }
}
