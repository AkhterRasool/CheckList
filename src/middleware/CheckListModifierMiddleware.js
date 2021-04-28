import axios from 'axios'
import Actions from '../constants/Actions'
import * as url from '../constants/URLs'
import setMessage from '../state/actioncreators/MessageAction'
import setSuccessMessage from '../state/actioncreators/SuccessMessage'
import setFailureMessage from '../state/actioncreators/FailureMessage'

const checkListModifierMiddleware = stateAPI => next => async action => {
    const user = stateAPI.getState().user;
    switch (action.type) {

        case Actions.addItem: 
            next(setMessage("Waiting for server to add item.."))
            await addItemToServer(user, action.payload)
            .then(response => {
                if (response.status === 201 && response.statusText === 'Created') {
                    action.payload = response.data.data
                    next(action)
                }

                next(setSuccessMessage("Successfully added item"))
            }).catch(error => {
                console.log(error);
                next(setFailureMessage('Failed to add item'))
            })
            break


        case Actions.removeItem: 
            next(setMessage('Waiting for server to remove item from list..'))
            await removeItemFromServer(user, action.payload.id)
            .then(response => {
                if (response.status === 200 && response.statusText === 'OK') {
                    next(setSuccessMessage('Removed item successfully.'))
                    next(action)
                }
            }).catch(error => {
                console.log(error);
                next(setFailureMessage('Failed to remove item'))  
            })
            break
        default:
            return next(action)
    }
}

const addItemToServer = async (user, item) => {
    if (user && user.token)
    return (
        axios.post(
            url.TASK_URL,
            {
                description: item
            },
            {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                }
            }
        )
    )
}

const removeItemFromServer = (user, id) => {
    if (user && user.token)
    return (
        axios.delete(
            `${url.TASK_URL}/${id}`,
            {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                }
            }
        )
    )
}

export default checkListModifierMiddleware