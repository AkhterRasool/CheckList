import React from 'react';
import './CheckListForm.css'

function CheckListForm(props) {
    return (
        <form onSubmit={props.onSubmit}>
            <label>
                <input type='text' id='item-name-field' placeholder='Please enter an item'/>
                <input type='submit' value='Add Item'/>
            </label>
        </form>
    );
}

export default CheckListForm;