import {combineReducers} from 'redux'
import {reducer as newsReducer} from '../components/news/store'
import {reducer as industryReducer} from '../components/industryDynamic/store'
import {reducer as studentReducer} from '../components/stuDynamic/store'
const reducer = combineReducers({
    news:newsReducer,
    industry:industryReducer,
    student:studentReducer
})

export default reducer
