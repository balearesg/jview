import {list} from './list';

interface Element {
	id: number;
	name: string;
	businessName: string;
}

export /*actions*/ /*bundle*/ class CompaniesBridge {
	list({limit, start, where}: {limit: number; start: number; where?: {name: string; businessName: string}}) {
		const offset = start ?? 1;

		try {
			const data = list.filter(
				element =>
					!where || element.name.includes(where.name) || element.businessName.includes(where.businessName)
			);

			const entries = data.slice(offset, offset + limit);

			return {status: true, data: {entries, total: list.length, next: offset + limit}};
		} catch (exc) {
			console.error('error list', exc);
			return {status: false, error: exc};
		}
	}
}
