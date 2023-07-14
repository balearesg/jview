import React, {useEffect, useMemo} from 'react';
import {BeyondEmpty} from '@bgroup/ui/empty';
import {useJViewContext} from './context';
import {Pager} from './pager';
import {ItemTable} from './item';
import {Table} from './table';
import {Grid} from './grid';
import {BeyondSpinner} from '@bgroup/ui/spinner';
import {Searchbar} from './search-bar';
export /*bundle*/ function View(): JSX.Element {
	const {
		dataHead,
		entries,
		title,
		total,
		rows,
		setPages,
		current,
		state,
		item,
		rowProps,
		loading,
		view,
		texts,
		textEmpty,
		isSearch,
		search,
	} = useJViewContext();

	const heads: JSX.Element[] =
		dataHead &&
		dataHead.map((item): JSX.Element => {
			return (
				<th key={item.id}>
					<span>{item.label}</span>
				</th>
			);
		});

	useEffect(() => {
		if (total <= rows) setPages(1);
		else setPages(Math.ceil(total / rows));
	}, [total, rows]);
	let cropStart: number = current === 1 ? 0 : (current - 1) * rows;

	const pageEntries: any[] = state?.controller?.pager ? entries : entries.slice(cropStart, cropStart + rows);

	const Item = item ?? ItemTable;

	const from = (current - 1) * rows + 1;
	const to = from + rows - 1;
	const control = useMemo(() => {
		const showedEntries = !!pageEntries.length ? pageEntries : entries;
		const output = showedEntries.map(
			(item, index: number): JSX.Element => <Item item={item} key={index} {...rowProps} index={index} />
		);
		const entry = view === 'grid' ? <Grid output={output} /> : <Table heads={heads} output={output} />;
		return entry;
	}, [pageEntries]);

	if (!entries.length)
		return <BeyondEmpty className="empty-jview" text={textEmpty ?? texts.empty} icon="circle-exclamation" />;
	const cls: string = loading ? 'container-table container-table-fetching ' : 'container-table';
	const showing: string = `${texts.showing} ${from} ${texts.to} ${to > total ? total : to} ${texts.of} ${total} ${
		texts.items
	}`;
	return (
		<div>
			<div className={cls}>
				<header>
					{title && <h4>{title}:</h4>}
					{isSearch && <Searchbar {...search} />}
				</header>
				{control}

				{(loading || state.controller.fetching) && (
					<div className="jview-fetching">
						<BeyondSpinner className="spinner" />
					</div>
				)}
			</div>
			<div className="content-pager">
				{showing}
				<Pager />
			</div>
		</div>
	);
}
