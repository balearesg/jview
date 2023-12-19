import React from 'react';
import { IconButton } from "pragmate-ui/icons";
import { useSelectContext } from '../contex';

export function Item({ item }): JSX.Element {
    const { manager, isDeleteItem } = useSelectContext();
    const isSelected: boolean =
        !!manager.selected &&
        manager.selected.value === item.value &&
        manager.selected.label === item.label;
    const cls = `${isSelected ? "active option" : "option"}`;
    const deleteOption = (event) => {
        event.stopPropagation();
        manager.selectDelete(item);
        //    manager.deleteOption();
    };
    return (
        <div
            className={cls}
            data-value={JSON.stringify(item)}
            onClick={manager.select}
        >
            {item.label}
            {isDeleteItem && <IconButton
                icon="delete"
                data-value={JSON.stringify(item)}
                onClick={deleteOption}
            />}
        </div>
    );
}
