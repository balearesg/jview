import React from 'react';

export function Edit({ isEdit, table, value, setValue }): JSX.Element {

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation()
        const value = event.currentTarget.value;
        //  table.label = value
        setValue(value);
    };
    if (isEdit) {
        return <input placeholder='edit' value={value} onChange={handleChange} />
    }
    return (
        <span>{!!value ? value : table.label}</span>
    )
}
