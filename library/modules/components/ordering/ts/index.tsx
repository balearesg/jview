import React, { RefAttributes, forwardRef, useImperativeHandle, useState, Ref, FC } from 'react';
import { IEntry, IProps, IRef, ITexts, IValue } from './interfaces';
import { Texts } from './texts';
import { OrderingContext } from './context';
import { defaultColumns, defaultField } from './default';
import { IconButton } from 'pragmate-ui/icons';
import { iconSort } from './icon';
import { View } from './view';

export /*bundle*/ const Ordering: FC<IProps & RefAttributes<unknown>> =
  forwardRef(function (props: IProps, ref: Ref<unknown>): JSX.Element {
    const [show, setShow] = useState<boolean>(false);
    const items = !!props.items && Array.isArray(props.items) ? props.items : []
    const entries = items.map(item => {
      return {
        show: item.key === defaultField,
        order: "DESC",
        key: item.key,
        selected: item.key,
        label: item.label
      }
    });
    const columns = entries.some(item => item.key === defaultField) ? entries : [...defaultColumns.concat([...entries])]
    const [state, setState] = React.useState<IEntry[]>([...columns]);
    const texts: ITexts = Texts("es");
    const handleModal = () => setShow(!show);
    useImperativeHandle(ref, (): IRef => {
      return {
        open: (): void => setShow(true),
        close: () => setShow(false),
        handleModal
      };
    });
    const close = () => {
      setState(columns);
      handleModal()
    };
    const value: IValue = { texts, ...props, entries, setState, state, close, show, handleModal };

    return (
      <OrderingContext.Provider value={value}>
        <span className="tooltip-item bottom" data-tooltip="Ordenar">
          <IconButton {...iconSort} onClick={handleModal} className='icon-header' />
        </span>
        <View />
      </OrderingContext.Provider>
    );
  });
