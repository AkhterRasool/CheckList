import React, { useState } from 'react';
import './CheckListItemRow.css';

function CheckListItemRow(props) {
    const [itemName, setItemName] = useState(props.itemName);

    return (
            <tr width='100%'>
                <td width='10%' className='td-checkbox'>
                    <input type='checkbox'/>
                </td>
                <td width='70%' className='td-desc'> 
                    {itemName}
                </td>
                <td width='20%' className='td-remove'>
                    <button onClick={() => props.handleRemoveItem(itemName)}>Remove</button>
                </td>
            </tr>
    );
}

export default CheckListItemRow;