import { mapDocDataToRdfWebData } from '$lib/server/data-mapper';
import { getDocument } from '$lib/firebase';
import { error as svelteError } from '@sveltejs/kit';

export const load = async () => {
	try {
		const docData = await getDocument('rdfweb', 'data');
		if (docData) {
			const rdfWebData = mapDocDataToRdfWebData(docData);
			return {
				feature: rdfWebData.feature,
				concerts: rdfWebData.concerts,
				presstexts: rdfWebData.presstexts,
				members: rdfWebData.members,
				links: rdfWebData.links,
				socialMediaLinks: rdfWebData.socialMediaLinks
			};
		} else {
			throw svelteError(404, 'Document not found');
		}
	} catch (err: unknown) {
		console.error('Error fetching Firestore document:', err);
		throw svelteError(500, 'Error fetching Firestore document');
	}
};
