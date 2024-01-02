import * as React from 'react';
import { useBinder } from '@beyond-js/react-18-widgets/hooks';
import { Search } from './search';
import { SelectContext } from './contex';
import { Options } from './options';
import { Manager } from './manager';
import { useOutsideClick } from './hooks/use-outside-click';
import { IValue } from './interfaces';

export /*bundle*/ function Select(props) {
    const [upd, setUpd] = React.useState({});
    const { current: manager }: React.MutableRefObject<Manager> = React.useRef(new Manager({ ...props }));
    const ref = useOutsideClick<HTMLDivElement>(manager.closeOptions);
    React.useEffect(() => {
        manager.options = props.options;
        manager.originalOptions = props.options
        manager.triggerEvent()
    }, [props.options])
    useBinder([manager], () => setUpd({}));
    const value: IValue = { ...props, manager, ref, options: manager.options };

    return (
        <SelectContext.Provider value={value}>
            <div className='container-select' id={props.id} ref={ref}>
                <Search />
                <Options />
            </div>
        </SelectContext.Provider>

    )
}