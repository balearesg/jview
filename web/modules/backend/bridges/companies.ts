import { list } from './list';

export /*actions*/ /*bundle*/ class CompaniesBridge {
	list({ limit, start, where }: { limit: number; start: number; where?: { name: string; businessName: string } }) {
		limit = limit || 5;
		const offset = start || 0;

		try {
			let data;
			if (where?.name === '' || where?.businessName === '') {
				data = list;
				const entries = limit ? data.slice(offset, offset + limit) : data;
				let next: number = 0;
				if (data.length > limit) {
					next = !start ? limit : limit + start;
					data.pop();
				} else {
					next = data.length;
				}

				return { status: true, data: { entries, total: data.length, next } };
			}

			data = list.filter(element => {
				const isNameValid = element.name.toLowerCase().includes(where?.name?.toLowerCase());
				const isBussinessNameValid = element.businessName
					?.toLowerCase()
					.includes(where?.businessName?.toLowerCase());

				const takeName = where?.name && isNameValid;
				const takeBussiness = where?.businessName && isBussinessNameValid;

				return !where || takeName || takeBussiness;
			});

			const entries = limit ? data.slice(offset, offset + limit) : data;

			let next: number = 0;
			if (data.length > limit) {
				next = !start ? limit : limit + start;
				data.pop();
			} else {
				next = data.length;
			}

			return { status: true, data: { entries, total: data.length, next } };
		} catch (exc) {
			console.error('error list', exc);
			return { status: false, error: exc };
		}
	}
}
