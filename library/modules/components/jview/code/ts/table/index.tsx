import React from 'react'
import { Header } from './header';
import { Items } from './items';

export function Table(): JSX.Element {
    return (
        <table className="table">
            <Header />
            <tbody><Items /></tbody>
        </table>
    )
};
