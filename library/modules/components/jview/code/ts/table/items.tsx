import * as React from 'react'
import { useJViewContext } from '../context';
import { ItemTable } from './item';
import { EmptyView } from '../empty-view';

export function Items(): JSX.Element {
    const { item, entries, state, rows, current, rowProps } = useJViewContext();
    const Item = item ?? ItemTable;
    let cropStart: number = current === 1 ? 0 : (current - 1) * rows;
    const pageEntries: any[] = state?.controller?.pager
        ? entries
        : entries.slice(cropStart, cropStart + rows);
    const showedEntries = !!pageEntries.length ? pageEntries : entries;
    if (!showedEntries.length) return <EmptyView />;

    const output = showedEntries.map(
        (item, index: number): JSX.Element => (
            <Item item={item} key={index} {...rowProps} index={index} />
        )
    );
    return (
        <>{output}</>
    )
}
