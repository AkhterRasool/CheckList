import Actions from './Actions'

const initialValue = {
    items: []
}

function checkListReducer(state = initialValue, action) {
    switch(action.type) {
        case Actions.addItem: 
            return {
                items : [...state.items, action.payload]
            }      
        case Actions.removeItem:
            return {
                items: state.items.filter(item => item !== action.payload)
            }
        default:
            return state
    }
}


export default checkListReducer
