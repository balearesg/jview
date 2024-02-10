import React, { InputHTMLAttributes, ReactNode } from 'react'
import { Input as AppInput } from 'pragmate-ui/form';

export interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    ref?: any;
    variant?: string;
    icon?: string;
    errorMessage?: string;
    value?: string;
    label?: any;
    children?: ReactNode;
    hasError?: boolean;
    password?: boolean
}

export /*bundle*/ function Input(props: IProps): JSX.Element {
    const { label } = props;
    const properties: IProps = Object.assign({}, props);
    delete properties.label

    return (
        <div className='jadmin-input'>
            <label className='label-jadmin'>{label}</label>
            <AppInput {...properties} />
        </div>
    )
};
