import * as actionTypes from './actionTypes'
import axios from 'axios'
import * as Api from '../../../api'
const getLeftList=(result)=>({
    type: actionTypes.GET_MENU_LIST,
    result
})

export const getMenuLeftList=()=>{
    return (dispatch)=>{
        axios.get(Api.GET_MENU_LIST).then(res=>{
            dispatch(getLeftList(res.data))
        })
    }
}