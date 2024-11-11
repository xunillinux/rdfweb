import * as db from '$lib/mock/database.js';

export function load() {
	return {
		concerts: db.getConcerts()
	};
}