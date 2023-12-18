import React from 'react'
import { Button } from "pragmate-ui/components";
import { useOrderingContext } from './context';

export function AddItem(): JSX.Element {
    const { texts, setState, state } = useOrderingContext();
    const handleClick = () => {
        const item = state.find(item => !item.show);
        item.show = true;
        const items = state.map(entry => entry.key === item.key ? item : entry);
        setState(items)
    };
    const itemsShowed = state.filter(item => item.show);
    const isAllShowed = itemsShowed.length === state.length

    return (
        <div>
            <Button onClick={handleClick} className='add-column' label={texts.addColumn} disabled={isAllShowed} />
        </div>
    )
}
