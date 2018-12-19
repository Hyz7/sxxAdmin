import {combineReducers} from 'redux'
import {reducer as newsReducer} from '../components/news/store'
import {reducer as industryReducer} from '../components/industryDynamic/store'
const reducer = combineReducers({
    news:newsReducer,
    industry:industryReducer
})

export default reducer
