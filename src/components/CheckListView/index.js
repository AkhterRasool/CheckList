import React from 'react';
import CheckListItemRow from '../CheckListItemRow';
import './CheckListView.css'

function CheckListView(props) {
    return (
        <table>
            <tbody>
                {
                    props.items.length === 0 && <tr><td width='100%' className='no-item-row'>No items in list</td></tr>
                }
                {
                    props.items.map(item => {
                        return (
                            <CheckListItemRow key={item} handleRemoveItem={props.handleRemoveItem} itemName={item}/> 
                        )
                    })
                }
            </tbody>
        </table>
    )
}
export default CheckListView;