import {DBManager} from '@beyond-js/reactive-2/database';
import config from '@bg/jview/config';

const dbName = config.params.application.localDB;
const dbVersion = Number(config.params.application.localDBVersion);

async function create() {
	try {
		const db = await DBManager.config(`${dbName}@${dbVersion}`, {
			companies: 'id',
		});
	} catch (e) {
		console.error('error', e);
	}
}

create();
