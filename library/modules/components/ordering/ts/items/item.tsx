import React, { ChangeEvent } from 'react'
import { useOrderingContext } from '../context';
import { Select } from "@bgroup/jview/select";
import { Radio } from "pragmate-ui/form";
import { IconButton } from 'pragmate-ui/icons';
import { defaultField } from '../default';

export function Item({ field }): JSX.Element {

    const { texts, items, state, setState } = useOrderingContext();
    const options = state.map(item => {
        return <option key={item.key} value={item.key}>{item.label}</option>
    });
    const order = state.find(item => item.key === field)?.order
    const isTimeCreated = field !== defaultField;
    const item = state.find(item => item.key === field);
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        item.order = value;
        const items = state.map(entry => entry.key === item.key ? item : entry);
        setState(items)
    };
    const handleClick = () => {
        item.show = false;
        const items = state.map(entry => entry.key === item.key ? item : entry);
        setState(items)
    };
    const value = item.selected;
    const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
        item.selected = event.currentTarget.value;
        const items = state.map(entry => entry.key === item.key ? item : entry);
        setState(items)
    }
    return (
        <div className='order-item'>
            <span>{texts.orderBy}</span>
            <select value={value} onChange={handleSelect} id="modal-select" name={field} title={item.label}>
                {options}
            </select>
            <Radio name={field} value="ASC" label={texts.ancestry} checked={order === "ASC"} onChange={handleChange} />
            <Radio name={field} value="DESC" label={texts.descendant} checked={order === "DESC"} onChange={handleChange} />
            {isTimeCreated && <IconButton icon="delete" onClick={handleClick} />}
        </div>
    )
}
