import React from 'react'
import { Modal } from 'pragmate-ui/modal';
import { Header } from './header';
import Items from './items';
import { AddItem } from './add-item';
import { Buttons } from './buttons';
import { Form } from "pragmate-ui/form";
import { useOrderingContext } from './context';

export function View() {
  const { state, onSubmit, show, handleModal } = useOrderingContext();
  if (!show) return null;
  const handleSubmit = () => {
    const orders: string[][] = state.filter(item => !!item.show).map(item => {
      return [item.selected, item.order]
    });
    if (onSubmit && typeof onSubmit === "function") onSubmit(orders);
    handleModal()
  };
  return (
    <Modal show className='container-ordering-modal' onClose={handleModal}>
      <Form onSubmit={handleSubmit}>
        <Header />
        <Items />
        <AddItem />
        <Buttons />
      </Form>
    </Modal>
  )
}
