import Actions from "../Actions"

export default function removeItemAction(item) {
    return {
        type: Actions.removeItem,
        payload: item
    }
}