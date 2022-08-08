import { combineReducers } from 'redux'
import { userProfileReducer } from './user/userReducers'

export interface IAppState {
	userProfile: any

}
const rootReducer = combineReducers<IAppState>({
	//user
	userProfile: userProfileReducer,

})

export default rootReducer
