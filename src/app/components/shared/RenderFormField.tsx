import * as React from 'react'
import {WrappedFieldProps} from "redux-form";
import {checkInvalidClasses, showInputError} from "./InputError";


interface IValidateFormInput {
    type: string;
    placeholder: string;
    required: boolean;
}
export const renderFormField = ({ input, type, required, placeholder, meta: { touched, error }}: WrappedFieldProps &  IValidateFormInput) => (
    <div className="form-group">
        <input {... input}
            type={type}
            className={checkInvalidClasses({touched, error, className: 'form-control'})}
            required={required}
            placeholder={placeholder} />

        {showInputError(error)}
    </div>
);
