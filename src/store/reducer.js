import {combineReducers} from 'redux'
import {reducer as homeReducer} from '../components/home/store'
import {reducer as industryReducer} from '../components/industryDynamic/store'
const reducer = combineReducers({
    home:homeReducer,
    industry:industryReducer
})

export default reducer