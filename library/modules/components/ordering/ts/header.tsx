import React from 'react'
import { useOrderingContext } from './context'

export function Header(): JSX.Element {
    const { texts } = useOrderingContext();
    return (
        <header className='header-order'>
            <h1>{texts.title}</h1>
        </header>
    )
}
