import Actions from "../../constants/Actions"

export default function setMessage(message, textColor='blue') {
    return {
        type: Actions.message,
        payload: {
            description: message,
            textColor: textColor
        }
    }
}