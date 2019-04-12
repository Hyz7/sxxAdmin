import {combineReducers} from 'redux'
import {reducer as newsReducer} from '../components/news/store'
import {reducer as industryReducer} from '../components/industryDynamic/store'
import {reducer as studentReducer} from '../components/stuDynamic/store'
import {reducer as downloadReducer} from '../components/download/store'
import courseReducer from '../store/course/reducer'
import bannerReducer from '../store/banner/reducer'
const reducer = combineReducers({
    news:newsReducer,
    industry:industryReducer,
    student:studentReducer,
    download:downloadReducer,
    course:courseReducer,
    banner:bannerReducer
})

export default reducer
