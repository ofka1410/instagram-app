import followAction from './followAction'
import LikeSaver from './LikeSaver'
import{combineReducers} from 'redux'


const allReducers= combineReducers({
    followAction: followAction,
    LikeSaver: LikeSaver

})
export default allReducers