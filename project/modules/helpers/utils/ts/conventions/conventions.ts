class Conventions {
	toCamelCase(key: string) {
		const keyArray: Array<any> = key.split(/\_/.test(key) ? '_' : '-');
		for (let i = 0; i < keyArray.length; i++) {
			if (i === 0) {
				keyArray[i] = keyArray[i].toLowerCase();
				continue;
			}
			keyArray[i] = keyArray[i].replace(/(^|\s)\S/g, (letter: string) => letter.toUpperCase());
		}
		return keyArray.join('');
	}

	toUnderscore(key: string) {
		const keyArray: Array<any> = key.split('');
		for (let i = 0; i < keyArray.length; i++) {
			if (keyArray[i] === keyArray[i].toUpperCase()) keyArray.splice(i++, 0, '_');
		}
		return keyArray.join('').toLowerCase();
	}

	objectProcessor(data: object, fn: any) {
		const newObject: object = {};
		let newKey: string = '';
		for (let key in data) {
			newKey = fn(key);
			const value = data[key];
			newObject[newKey] =
				value &&
				typeof value === 'object' &&
				!['timeCreated', 'timeUpdated', 'dateCreated', 'date_Estimate'].includes(key)
					? this.objectProcessor(data[key], fn)
					: value;
		}
		return newObject;
	}

	underscoreToCamelCase(data: object) {
		return this.objectProcessor(data, this.toCamelCase);
	}

	camelCaseToUnderscore(data: object) {
		return this.objectProcessor(data, this.toUnderscore);
	}

	#types: object = {
		camelCase: this.underscoreToCamelCase,
		underscore: this.camelCaseToUnderscore,
	};
	processItems(data: object[], type: string = 'camelCase') {
		return data.map((item) => this.#types[type].call(this, item));
	}
}

export /*bundle*/ const conventions = new Conventions();
