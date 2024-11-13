import * as db from '$lib/mock/database.js';

export function load() {
	return {
		feature: db.getFeature(),
		concerts: db.getConcerts(),
		presstexts: db.getPresstexts(),
		members: db.getMembers()
	};
}