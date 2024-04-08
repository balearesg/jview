import React from 'react';
import { Empty } from 'pragmate-ui/empty';
import { useJViewContext } from './context';

export function EmptyView() {
	const { texts, textEmpty, loading, fetching } = useJViewContext();

	if (fetching || loading) return null;

	return (
		<Empty className="empty-jview" icon="circle-exclamation">
			<h3>{textEmpty ?? texts.empty}</h3>{' '}
		</Empty>
	);
}
