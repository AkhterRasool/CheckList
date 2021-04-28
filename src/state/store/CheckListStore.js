import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import checkListModifierMiddleware from '../../middleware/CheckListModifierMiddleware'
import checkListReducer from '../reducers/CheckListReducer'

const middlewareEnhancer = composeWithDevTools(applyMiddleware(checkListModifierMiddleware))
const checkListStore = createStore(checkListReducer, middlewareEnhancer)

export default checkListStore