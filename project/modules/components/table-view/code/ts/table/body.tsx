import React from 'react';
import {v4 as uuidv4} from 'uuid';
import {useTableViewContext} from '../context';

export function Body({items}) {
	const {item} = useTableViewContext();

	const Item = item;
	const output = items.map(element => <Item key={uuidv4()} {...element} />);

	return <tbody className="table-body">{output}</tbody>;
}
