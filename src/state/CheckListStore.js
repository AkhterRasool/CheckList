import { createStore } from 'redux'
import checkListReducer from './CheckListReducer'

const checkListStore = createStore(checkListReducer)

export default checkListStore