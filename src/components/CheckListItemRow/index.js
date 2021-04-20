import React from 'react';
import './CheckListItemRow.css';

function CheckListItemRow(props){
    
    return (
            <tr width='100%'>
                <td width='10%' className='td-checkbox'>
                    <input type='checkbox'/>
                </td>
                <td width='70%' className='td-desc'> 
                    {props.itemName}
                </td>
                <td width='20%' className='td-remove'>
                    <button onClick={props.onRemoveButtonClicked}>Remove</button>
                </td>
            </tr>
    );
}

export default CheckListItemRow;