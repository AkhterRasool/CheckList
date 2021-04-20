import React , {useEffect, useState} from 'react';
import './CheckListForm.css'

function CheckListForm(props) {

    const [itemName, setItemName] = useState('');

    function submitForm(e) {
        e.preventDefault();
        props.handleAddItem(itemName);
        setItemName('');
    }

    function handleOnChange(e) {
        setItemName(e.target.value);
    }

    return (
        <form onSubmit={submitForm}>
            <label>
                <input type='text' id='item-name-field' placeholder='Please enter an item' onChange={handleOnChange} value={itemName}/>
                <input type='submit' value='Add Item'/>
            </label>
        </form>
    );
}

export default CheckListForm;