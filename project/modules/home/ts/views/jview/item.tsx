import React from 'react';

export function Item({item}) {
	return (
		<tr>
			<td>{item.name}</td>
			<td>{item.businessName}</td>
		</tr>
	);
}
