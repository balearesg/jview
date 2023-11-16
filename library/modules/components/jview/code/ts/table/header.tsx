import React from 'react'
import { useJViewContext } from '../context';
import { Head } from './head';

export function Header(): JSX.Element {
    const { header, isActions } = useJViewContext();
    const heads = header ?? <Head />
    return (
        <thead>
            <tr>{heads}
                {isActions && <th></th>}
            </tr>
        </thead>
    )
}
