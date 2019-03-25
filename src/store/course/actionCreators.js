import * as actionTypes from '../actionTypes'
import axios from 'axios'
import * as Api from '../../api'
import {message} from 'antd'
const getList=(result)=>({
    type: actionTypes.ADD_COURSE_INFO,
    result,
})

export const addCourseInfo=(body)=>{
    return (dispatch)=>{
        axios.post(Api.ADD_COURSE_INFO,body,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res=>{
            if(res.data.success){
                message.success('保存成功！')
                dispatch(getList(res.data))
            }else{
                message.error('保存失败，请重试！')
            }
        })
    }
}
/**
 * 获取课程列表
 * @param result
 * @returns {{type: string, result: *}}
 */
const getCourseList=(result)=>({
    type: actionTypes.GET_COURSE_LIST,
    result,
})

export const getAllCourse=()=>{
    return (dispatch)=>{
        axios.get(Api.GET_ALL_COURSE_LIST).then(res=>{
            dispatch(getCourseList(res.data.courseList))
        })
    }
}
/**
 * 删除课程信息
 * @returns {{type: string, result: (*|{})}}
 */
/*const deleteInfo=()=>({
    type: actionTypes.DELETE_COURSE_INFO,
    result,
})

export const deleteCourseInfo=(id)=>{
    return (dispatch)=>{
        axios.post(Api.DELETE_COURSE_INFO+'?courseId='+id).then(res=>{
            if(res.data.success){
                dispatch(deleteInfo(res.data))
                message.success('课程信息删除成功！')
            }
        })
    }
}*/
const updateCourseList=(result)=>({
    type: actionTypes.UPDATE_COURSE,
    result,
})
export const updateCourse=(body)=>{
    return (dispatch)=>{
        axios.post(Api.UPDATE_COURSE,body).then(res=>{
            if(res.data.success){
                dispatch(updateCourseList(res.data.courseList))
                message.success('课程信息修改成功！')
            }
        })
    }
}
/**
 * 获取二级目录
 * @returns {{type: string, result: (*|{})}}
 */
const catalogueList=(result)=>({
    type: actionTypes.COURSE_CATALOGUE,
    result,
})
export const getTeachPlan=(id)=>{
    return (dispatch)=>{
        axios.get(Api.COURSE_CATALOGUE+'?courseId='+id).then(res=>{
            // console.log(res)
            if(res.status==200){
                console.log(res.data)
                dispatch(catalogueList(res.data.children))
                // message.success('')
            }
        })
    }
}
