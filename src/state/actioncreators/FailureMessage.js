import setMessage from "./MessageAction";

export default function setFailureMessage(message) {
    return setMessage(message, 'red')
}