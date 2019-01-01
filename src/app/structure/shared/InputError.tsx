import * as React from "react";
interface IInvalidClasses {
    touched: boolean;
    error: boolean;
    className: string;
}

const showInputError = (text: string) => <div className="invalid-feedback"> {text} </div>;

const checkInvalidClasses = ({touched, error, className}: IInvalidClasses) => touched && error
    ? className + ' is-invalid'
    : className;

export {showInputError, checkInvalidClasses};