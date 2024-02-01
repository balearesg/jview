import React, { TextareaHTMLAttributes, ReactNode } from 'react'
import { Textarea } from 'pragmate-ui/form';

export interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    ref?: any;
    errorMessage?: string;
    max?: string;
    lengthMessage?: string;
    hasError?: boolean;
    label?: string;
    value?: string;
    counter?: boolean;
    children?: ReactNode;
}

export /*bundle*/ function TextArea(props: IProps): JSX.Element {
    const { label } = props;
    const properties: IProps = Object.assign({}, props);
    delete properties.label
    return (
        <div className='jadmin-input'>
            <label className='label-jadmin'>{label}</label>
            <Textarea {...properties} />
        </div>
    )
};
