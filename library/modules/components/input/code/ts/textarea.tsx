import React, { TextareaHTMLAttributes, HTMLAttributes } from 'react'
import { Textarea } from 'pragmate-ui/form';
interface props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    ref?: any;
    errorMessage?: string;
    max?: string;
    lengthMessage?: string;
    hasError?: boolean;
    className?: HTMLAttributes<HTMLDivElement>["className"];
    label?: any;
  };

export /*bundle*/ function TextArea(props : props): JSX.Element {
    const { label } = props;
    const properties : props = Object.assign({}, props);
    delete properties.label
    return (
        <div className='jadmin-input'>
            <label className='label-jadmin'>{label}</label>
            <Textarea {...properties} />
        </div>
    )
};
