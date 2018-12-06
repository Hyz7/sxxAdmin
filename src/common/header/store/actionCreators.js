import * as actionTypes from './actionTypes'

const getLeftList=(result)=>({
    type: '',
    result
})

export const getMenuLeftList=()=>{
    return (dispatch)=>{
        dispatch(getLeftList())
    }
}