import React from 'react'

export function Table({ heads, output }): JSX.Element {
    return (
        <table className="table responsive-table">
            <thead>
                <tr>{heads}</tr>
            </thead>
            <tbody>{output}</tbody>
        </table>
    )
};
