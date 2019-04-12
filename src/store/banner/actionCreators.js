import * as actionTypes from '../actionTypes'
import axios from 'axios'
import * as Api from '../../api'
import {message} from 'antd'

/**
 * 获取banner列表
 * @param result
 * @returns {{type: string, result: *}}
 */
const getBannerList=(result)=>({
    type: actionTypes.GET_BANNER_LIST,
    result,
})

export const getAllBanner=()=>{
    return (dispatch)=>{
        axios.get(Api.GET_BANNER_LIST).then(res=>{
            dispatch(getBannerList(res.data.bannerList))
        })
    }
}

export const deleteBanner=()=>{
    return (dispatch)=>{
        axios.get(Api.DELETE_BANNER).then(res=>{
            dispatch(getBannerList(res.data.bannerList))
        })
    }
}