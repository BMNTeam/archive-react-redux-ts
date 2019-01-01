import {ChangeEvent} from "react";
import * as React from "react";
import {WrappedFieldProps} from "redux-form";
import {checkInvalidClasses, showInputError} from "./InputError";

type WrappedFieldWithPlaceholder =  WrappedFieldProps & {
    placeholder: string;
}

class FileInput extends React.Component<WrappedFieldWithPlaceholder, HTMLInputElement>
{
    constructor(props: WrappedFieldWithPlaceholder)
    {
        super(props);
         this.onChange = this.onChange.bind(this);
    }

    public onChange(e: ChangeEvent<HTMLInputElement>)
    {
        const {onChange} = this.props.input;
        onChange(e.target && e.target.files && e.target.files[0]);
    }

    public render()
    {
        const {value} = this.props.input;
        const {dirty, error} = this.props.meta;
        return (
            <div>
                <input
                    type="file"
                    className={checkInvalidClasses({
                            className: "custom-file-input",
                            error,
                            touched: dirty, /* touched event never triggers on input[type=file]*/
                    })}
                    onChange={this.onChange}
                />
                <label className="custom-file-label"> {value ? value.name : this.props.placeholder}</label>
                {showInputError(error)}
            </div>

    )
    }
}

export default FileInput;
