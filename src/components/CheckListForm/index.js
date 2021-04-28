import React from 'react';
import {Form, Formik } from 'formik';
import './CheckListForm.css'
import checkListStore from '../../state/store/CheckListStore';
import addItemAction from '../../state/actioncreators/AddItemAction';
import { useDispatch } from 'react-redux';
import setFailureMessage from '../../state/actioncreators/FailureMessage';

function CheckListForm() {

    const itemMinLength = 4
    const dispatch = useDispatch();

    const validate = value => {
        const input = value.input;
        const errors = {};
        if (input.length === 0 || input === '') {
            errors.input = 'Item cannot be empty.';
        } else if (input.length < itemMinLength) {
            errors.input = `Item must have at least ${itemMinLength} characters.`
        }
        dispatch(setFailureMessage(errors.input));
        return errors;
    };

    const handleSubmission = (values) => {
        const item = values.input
        const state = checkListStore.getState()
        if (state.items.map(item => item.description).indexOf(item) > -1) {
            dispatch(setFailureMessage("Item added already."));
        } else {
            dispatch(addItemAction(item))
        }
    }

    return (
        <Formik
            initialValues={{input: ''}}
            onSubmit={ handleSubmission}
            validate = {validate}
        >
            {
                formik => (
                    <Form onSubmit={formik.handleSubmit}>
                        <input 
                            type="text"
                            id="item-name-field"
                            name="input"
                            placeholder='Please enter an item'
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}/>

                        <input type="submit" value='Add Item'/>
                    </Form>
                )
            }
        </Formik>
        
    )
}

export default CheckListForm;