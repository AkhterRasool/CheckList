import React from 'react';
import {Form, Formik } from 'formik';
import './CheckListForm.css'
import checkListStore from '../../state/CheckListStore';
import addItemAction from '../../state/actioncreators/AddItemAction';
import { useDispatch } from 'react-redux';
import errorMessage from '../../state/actioncreators/ErrorMessageAction';

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
        dispatch(errorMessage(errors.input));
        return errors;
    };

    const handleSubmission = (values) => {
        const item = values.input
        const state = checkListStore.getState()
        if (state.items.indexOf(item) > -1) {
            console.log("Item added already."); //For now display the error in console.
            return;
        }
        dispatch(addItemAction(item))
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