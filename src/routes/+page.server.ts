import * as db from '$lib/server/database.js';
import { getDocument } from '$lib/server/firebase.js';

export const load = async () => {
	try {
		const docData = await getDocument('rdfweb', 'data');
		if (docData) {
			return {
				feature: docData.feature,
				concerts: db.getConcerts(),
				presstexts: db.getPresstexts(),
				members: db.getMembers(),
				links: db.getLinks(),
				socialMediaLinks: db.getSocialMediaLinks(),
			}
		} else {
			console.error('Document not found');
			return {
				feature: null,
				concerts: db.getConcerts(),
				presstexts: db.getPresstexts(),
				members: db.getMembers(),
				links: db.getLinks(),
				socialMediaLinks: db.getSocialMediaLinks(),
				error: 'Document not found'
			}
		}
	} catch (error: unknown) {
		console.error('Error fetching Firestore document:', error);
		return {
			feature: null,
			concerts: db.getConcerts(),
			presstexts: db.getPresstexts(),
			members: db.getMembers(),
			links: db.getLinks(),
			socialMediaLinks: db.getSocialMediaLinks(),
			error: error
		};
	}
};
