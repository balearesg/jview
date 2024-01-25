import React, { ChangeEvent, SyntheticEvent } from 'react'
import { usePanelContext } from '../context';
import { IValues } from '../types';
import { IconButton } from "pragmate-ui/icons";
import { Edit } from './edit';

export function Item({ table }) {
    const { isEditColumns, max, setValues, values, states, setStates, entity } = usePanelContext();
    const [value, setValue] = React.useState(table.label);
    const [isEdit, setIsEdit] = React.useState(false)
    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        event.stopPropagation()
        const { name, type, checked }: HTMLInputElement & EventTarget = event.currentTarget as HTMLInputElement;
        if (type === 'checkbox' && name !== 'all') {
            const allValues: IValues = { ...values };
            delete allValues.all;
            delete allValues.search;
            const validateChecks: Array<boolean> = Object.values(allValues).filter((table): boolean => table === true);

            if (validateChecks.length >= max && checked) return;

            setValues({
                ...values,
                [name]: checked,
                all: validateChecks.length === max - 1,
            });
        }
    };
    const handleEdit = (event: SyntheticEvent) => {
        event.stopPropagation();

        if (isEdit && value) {
            const index = states.items.findIndex(entry => entry.id === table.id && table.label === entry.label);
            const item = structuredClone(table);
            item.label = value;
            const items = [...states.items];
            items[index] = item
            setStates({ ...states, items });
            localStorage.setItem(`tables-${entity}`, JSON.stringify(items))
        }
        setIsEdit(!isEdit)
    };
    const icon = isEdit ? "check" : "edit"
    return (
        <div className='item-check'>
            <div className="pui-checkbox">
                <input
                    style={{ display: "none" }}
                    type="checkbox"
                    className="pui-checkbox--input"
                    id={table.id}
                    name={table.id}
                    checked={values[table.id] ?? ""}
                    onChange={handleChange}
                />
                <label className="pui-checkbox--label" htmlFor={table.id}>
                    <span>
                        <svg width="12px" height="9px" viewBox="0 0 12 9">
                            <polyline points="1 5 4 8 11 1"></polyline>
                        </svg>
                    </span>
                    <Edit table={table} value={value} setValue={setValue} isEdit={isEdit} />
                </label>
            </div>
            {isEditColumns && <IconButton icon={icon} onClick={handleEdit} />}
        </div>

    );
}
