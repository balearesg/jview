import React from 'react'
import { Item } from './item'
import { useOrderingContext } from '../context'

export default function Items(): JSX.Element {
  const { state } = useOrderingContext();
  const output = state.filter((item) => item.show).map(item => {
    return <Item key={item.key} field={item.key} />
  })
  return (
    <div className='order-items'>
      {output}
    </div>

  )
};
