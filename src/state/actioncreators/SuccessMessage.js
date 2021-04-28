import setMessage from "./MessageAction";

export default function setSuccessMessage(message) {
    return setMessage(message, 'green')
}