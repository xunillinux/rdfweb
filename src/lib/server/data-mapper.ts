import type { RdfWebData } from "$lib/model/rdf-data-model";
import type { DocumentData } from "firebase/firestore";

export function mapDocDataToRdfWebData(docData: DocumentData): RdfWebData {
  return {
    headerImages: docData.headerImages ?? null,
    feature: docData.feature ?? null,
    concerts: docData.concerts?.map((concert: any) => {
      return {
        date: concert.date.toDate(),
        name: concert.name,
        location: concert.location,
        ticketUrl: concert.ticketUrl
      };
    }) ?? null,
    presstexts: docData.presstexts ?? null,
    members: docData.members ?? null,
    links: docData.links ?? null,
    socialMediaLinks: docData.socialMediaLinks ?? null,
  };
}
