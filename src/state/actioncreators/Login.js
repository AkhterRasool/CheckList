import Actions from "../../constants/Actions";

export function login(token) {
    return {
        type: Actions.login,
        payload: token
    }
}