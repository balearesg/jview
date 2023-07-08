import React from 'react';

interface IProps extends React.HTMLAttributes<HTMLButtonElement> {
	current: boolean;
	dataPage: number;
}

export function Page({dataPage, current, ...props}: IProps) {
	const currentCls = current ? 'current' : '';

	return (
		<button data-page={dataPage} className={`page-indicator ${currentCls}`} {...props}>
			{dataPage}
		</button>
	);
}
