import Actions from "../Actions"

export default function addItemAction(item) {
    return {
        type: Actions.addItem,
        payload: item
    }
}

