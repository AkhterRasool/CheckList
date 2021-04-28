import Actions from "../../constants/Actions"

export default function removeItemAction(itemId, itemDesc) {
    return {
        type: Actions.removeItem,
        payload: {
            id: itemId,
            description: itemDesc
        }
    }
}