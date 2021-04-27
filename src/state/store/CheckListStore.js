import { createStore } from 'redux'
import checkListReducer from '../reducers/CheckListReducer'

const checkListStore = createStore(checkListReducer)

export default checkListStore