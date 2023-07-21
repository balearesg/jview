import React from 'react';

export function Item({name, businessName}) {
	return (
		<tr className="user-item">
			<td>{name}</td>
			<td>{businessName}</td>
		</tr>
	);
}
