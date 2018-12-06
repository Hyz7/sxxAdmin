import {combineReducers} from 'redux'
import {reducer as homeReducer} from '../components/home/store'
import {reducer as headerReducer} from '../common/header/store'
const reducer = combineReducers({
    home:homeReducer,
    header:headerReducer
})

export default reducer