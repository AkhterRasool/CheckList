import { Empty } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import CheckListItemRow from '../CheckListItemRow';
import './CheckListView.css'

function CheckListView() {
    const items = useSelector(state => state.items)
    return (
        <table>
            <tbody>
                {
                    items.length === 0 && 
                    <tr>
                        <td width='100%' className='no-item-row'>
                            <Empty image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg" description='No items in list'/>
                        </td>
                    </tr>
                }
                {
                    items.map(item => {
                        return (
                            <CheckListItemRow key={item} itemName={item}/> 
                        )
                    })
                }
            </tbody>
        </table>
    )
}
export default CheckListView;