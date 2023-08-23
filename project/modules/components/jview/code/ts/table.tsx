import React from 'react'
import { useJViewContext } from './context';

export function Table({ heads, output }): JSX.Element {
    const { actions } = useJViewContext();
    const isActions = (!!actions || typeof actions === "object") && (!!actions.edit || !!actions.delete || !!actions.status)
    return (
        <table className="table responsive-table">
            <thead>
                <tr>{heads}
                {isActions && <th></th>}
                </tr>
            </thead>
            <tbody>{output}</tbody>
        </table>
    )
};
