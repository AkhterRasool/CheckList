import Actions from "../Actions"

export default function errorMessage(message) {
    return {
        type: Actions.error,
        payload: message
    }
}