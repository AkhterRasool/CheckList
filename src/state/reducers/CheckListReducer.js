import Actions from '../../constants/Actions'

const initialValue = {
    items: [],
    user: {},
    message: {}
}

function checkListReducer(state = initialValue, action) {
    switch(action.type) {
        case Actions.addItem: 
            return {
                ...state,
                items: [...state.items, action.payload]
            }      
            
        case Actions.removeItem:
            return {
                ...state,
                items: state.items.filter(item => item.description !== action.payload.description)
            }

        case Actions.message:
            return {
                ...state,
                message: action.payload.description === '' ? {} : action.payload
            }

        case Actions.login:
            return {
                ...state,
                user : {
                    ...state.user,
                    isLoggedIn: true,
                    token: action.payload
                }
            }
        
        case Actions.logout:
            return {
                ...state,
                user: {
                    ...state.user,
                    isLoggedIn: false,
                    token: undefined
                }
            }

        case Actions.setItems:
            return {
                ...state, 
                user: {...state.user},
                items: action.payload
            }

        default:
            return state
    }
}


export default checkListReducer
