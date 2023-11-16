import React, { InputHTMLAttributes } from 'react'
import { Input as AppInput } from 'pragmate-ui/form';
interface props extends InputHTMLAttributes<HTMLInputElement> {
    ref?: any;
    errorMessage?: string;
    lengthMessage?: string;
    hasError?: boolean;
    icon?: string;
    label?: any;
    password?: boolean;
    loading?: boolean;
    colorSpinner?: string;
    max?: string
};

export /*bundle*/ function Input(props: props): JSX.Element {
    const { label } = props;
    const properties: props = Object.assign({}, props);
    delete properties.label

    return (
        <div className='jadmin-input'>
            <label className='label-jadmin'>{label}</label>
            <AppInput {...properties} />
        </div>
    )
};
