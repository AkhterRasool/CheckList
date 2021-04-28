import Actions from "../../constants/Actions"

export default function setItems(items) {
    return {
        type: Actions.setItems,
        payload: items
    }
}