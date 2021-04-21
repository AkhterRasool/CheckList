import React from 'react';
import {Form, Formik } from 'formik';
import './CheckListForm.css'

function CheckListForm(props) {

    const itemMinLength = 4

    const validate = value => {
        const input = value.input;
        const errors = {};
        if (input.length === 0 || input === '') {
            errors.input = 'Item cannot be empty.';
        } else if (input.length < itemMinLength) {
            errors.input = `Item must have at least ${itemMinLength} characters.`
        }
        props.setError(errors.input);
        return errors;
    };

    return (
        <Formik
            initialValues={{input: ''}}
            onSubmit={ values => {
                    const item = values.input
                    props.handleAddItem(item)
                }
            }
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