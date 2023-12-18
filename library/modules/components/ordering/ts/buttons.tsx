import React from 'react'
import { Button } from "pragmate-ui/components";
import { useOrderingContext } from './context';

export function Buttons(): JSX.Element {
    const { texts, close } = useOrderingContext();

    return (
        <div className='buttons-order'>
            <Button variant='secondary' label={texts.cancel} onClick={close} />
            <Button variant='primary' label={texts.order} type='submit' />
        </div>
    )
}
