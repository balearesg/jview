import * as React from 'react';
import { Table } from './table';
export /*bundle*/
function View() {
	return (
		<div className='page__container'>
			<h1>
				My first page using Jview with <span className='beyond'>Beyondjs</span>!
			</h1>

			<section className='container__table'>
				<Table />
			</section>
		</div>
	);
}
