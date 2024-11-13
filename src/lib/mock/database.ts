const concerts: Concert[] = [
	{ date: new Date('2020-08-28'),	name: 'Gummizelle',	location: 'Langendorf' },
	{ date: new Date('2021-09-11'),	name: 'Träffpunkt Festival',	location: 'Biberist' },
	{ date: new Date('2021-11-13'),	name: 'Jamarama',	location: 'Aarau'	},
	{ date: new Date('2022-03-24'),	name: 'Kiff',	location: 'Aarau' },
	{ date: new Date('2022-08-27'),	name: 'Mida Festival',	location: 'Aarau' },
	{ date: new Date('2022-09-2'),	name: 'Sub Divo Festival',	location: 'Windisch' },
	{ date: new Date('2022-11-12'),	name: 'Heimspiel',	location: 'Flösserplatz, Aarau' },
	{ date: new Date('2023-03-31'),	name: 'Album Release\nDog Daughterz',	location: 'APA Kulta, Olten' },
	{ date: new Date('2023-04-29'),	name: 'Hallebar',	location: 'Buchs (AG)' },
	{ date: new Date('2023-05-19'),	name: 'Strom & Drang',	location: 'Kiff, Aarau' },
	{ date: new Date('2023-06-23'),	name: 'Summerside Festival',	location: 'Grenchen' },
	{ date: new Date('2023-07-3'),	name: 'SfGA',	location: 'Aarau' },
	{ date: new Date('2023-11-18'),	name: 'Kreuzkultur',	location: 'Solothurn' },
	{ date: new Date('2024-05-10'),	name: 'Kulturfabrik Kofmehl',	location: 'Solothurn' },
	{ date: new Date('2024-05-17'),	name: 'Vario Bar',	location: 'Olten' },
	{ date: new Date('2024-07-1'),	name: 'SfGA',	location: 'Aarau' },
	{ date: new Date('2024-07-27'),	name: 'Waudstock Festival',	location: 'Subingen' },
	{ date: new Date('2024-09-13'),	name: 'Album Release',	location: 'Kreuzkultur,\nSolothurn' },
	{ date: new Date('2024-09-14'),	name: 'Synergia Openair',	location: 'Effretikon' },
	{ date: new Date('2024-09-27'),	name: 'Hallebar',	location: 'Buchs' },
	{ date: new Date('2024-09-28'),	name: 'Heso Jugendzelt',	location: 'Solothurn' },
	{ date: new Date('2024-12-28'),	name: 'Album Release\nGod In Therapy',	location: 'Kiff, Aarau' },
];

const feature: Feature = {
	image: '/images/albumcover.jpg',
	heading: '"Dead Inside"',
	subheading: 'Debut Album',
	caption: 'Out Now',
	featureLinks: [
		{ text: 'Spotify', href: 'https://open.spotify.com/album/51QY6YWKIF6NFOm5ecR00w?si=WgQwaZQ-RsqBwXxaWHFOMQ' },
		{ text: 'Apple Music', href: 'https://music.apple.com/ch/album/dead-inside/1753775361' },
		{ text: 'Youtube', href: 'https://www.youtube.com/watch?v=5a-EhAtO9wc&list=OLAK5uy_k3bfz7OmGqpWJWuz9VCF6ri5ukcPXnUeI' },
		{ text: 'Tidal', href: 'https://listen.tidal.com/album/371165643' }
	]
}

const presstexts: PressText[] = [
	{language: 'EN', text: 'After four years of energetic, legendary Robot Dog Funeral live shows, the time has finally come: The band will release their debut album "Dead Inside" on September 13, 2024.\n\nThe record features eleven songs about weltschmerz, love and inner turmoil, catchy guitar riffs and the pure emotions of an unmistakable voice. Dancey synthesizer chords meet powerful drums and explode into a unique style that floats around somewhere in alt rock universe.\n\nRobot Dog Funeral’s identity is four-fold: It’s what happens when a multigenre enthusiast and self-taught bassist and vocalist, a precision drummer with a metal background, an indie nerd with a synthesizer collection and a guitarist with a retro flair find each other.\n\nOver the course of five years, this constellation has created music that naturally and excitingly weaves together references from psychedelic rock, metal, rap, post-punk and indietronica to create the Robot Dog Funeral signature style. Sometimes the sound makes one whirl around and dance to fast rhythms, sometimes everything comes crashing down with distortion and screams, only to continue at half speed and with twice the intensity. The lyrics teem with social criticism and rebellion, but also go straight to the heart through coded messages to lovers and the world.\n\nBorn out of interregional friendships and since then active everywhere between and around Solothurn and Aarau, Robot Dog Funeral have become an integral part of the music scene in north-western Switzerland. Concerts at events such as the Summerside Festival, Träffpunkt Festival or Sub Divo, to name but a few, are complemented by appearances as the support band for Dirty Sound Magnet, at the Musig i de Altstadt Festival or at Kofmehl Solothurn.'},
	{language: 'DE', text: 'Nach vier Jahren energiegeladener, sagenumwobener Robot-Dog-Funeral-Liveshows ist es endlich so weit: Die Band veröffentlicht am 13. September 2024 ihr Debüt Album «Dead Inside».\n\nGenau hier liegt der Hund begraben: In elf Songs über Weltschmerz, Liebe und Zerrissenheit, in Ohrwurm-induzierenden Gitarrenriffs und in den puren Emotionen einer unverkennbaren Stimme. Tanzbare Synthesizer-Akkorde und wuchtige Drums treffen aufeinander und explodieren zu einem ganz einzigartigen Stil, der irgendwo im Universum des Alternative Rock herumschwirrt.\n\nRobot Dog Funeral ist das was passiert, wenn ein Mensch mit Multigenre-Enthusiasmus und einer Leidenschaft für Bass und Gesang, ein Präzisionsschlagzeuger mit Metal-Hintergrund, ein Indie-Nerd mit Synthesizer-Sammlung und ein Gitarrist mit Retro-Flair zusammenfinden.\n\nIn dieser Konstellation entstand über fünf Jahre hinweg Musik, die ihre Referenzen aus Psychedelic Rock, Metal, Rap, Postpunk und Indietronica natürlich und auf aufregende Art zu einer neuen, eigenen Handschrift zusammenwebt. Mal lässt der Sound einen zu schnellen Rhythmen herumwirbeln und tanzen, mal kracht alles unter Verzerrung und Schreien zusammen, um in halbem Tempo und in doppelter Intensität weiterzumachen. Die Texte strotzen vor Gesellschaftskritik und Rebellion, gehen aber auch mitten ins Herz mit verschlüsselten Nachrichten an Geliebte und die Welt.\n\nEntstanden aus interregionalen Freundschaften und seither aktiv überall zwischen und um Solothurn und Aarau sind Robot Dog Funeral zu einem festen Bestandteil der Nordwestschweizer Musikszene herangewachsen. Konzerte an Veranstaltungen wie dem Summerside Festival, Träffpunkt Festival oder Sub Divo, um nur einige zu nennen, ergänzen Auftritte als Vorband von Dirty Sound Magnet, am Musig i de Altstadt Festival oder im Kofmehl Solothurn.'},
];

const members: Member[] = [
	{
		name: "Johnny 7",
		role: "Vocals / Bass",
		image: "/images/portrait_jonathan.jpg",
	},
	{
		name: "Zisi",
		role: "2nd Vocals / Guitar",
		image: "/images/portrait_jan.jpg",
	},
	{
		name: "Jonny 0",
		role: "Drums",
		image: "/images/portrait_jonas.jpg",
	},
	{
		name: "Dino",
		role: "Synths",
		image: "/images/portrait_martin.jpg",
	},
];

const links: Link[] = [
	{ text: 'Booking', href: 'mailto:contact@robotdogfuneral.com' },
	{ text: 'Press Text', href: 'https://drive.google.com/drive/folders/1GNfsOAI5vvnOvRETmqsDymSJY84oIBxF' },
	{ text: 'Band Photos', href: 'https://drive.google.com/drive/folders/1HWUOQHmP5KUaSBAQV6fztaDKaDDZRsPt' }
];

const socialMediaLinks: SocialMediaLinks = {
	linkInstagram: 'https://www.instagram.com/robotdogfuneralband/',
	linkYoutube: 'https://www.youtube.com/channel/UCyVw9Z6y2CoHXI75expU34g',
	linkSpotify: 'https://open.spotify.com/artist/0VWexRbUH4PpcsbMjUJxJi?si=3rhsLtfpSIK-yjBXBEL4iw',
	linkFacebook: 'https://www.facebook.com/robotdogfuneralband/',
}

export type Concert = {
	date: Date;
	name: string;
	location: string;
}

export type Feature = {
	image: string; // should be blob
	heading: string;
	subheading: string;
	caption: string;
	featureLinks: Link[];
}

export type Link = {
	text: string;
	href: string;
	marginBottom?: string;
}

export type SocialMediaLinks = {
	linkInstagram?: string;
	linkYoutube?: string;
	linkSpotify?: string;
	linkFacebook?: string;
}

export type PressText = {
	language: string;
	text: string;
}

export type Member = {
	name: string;
	role: string;
	image: string; // should be blob
}

export function getConcerts() {
	return concerts;
}

export function getFeature() {
	return feature;
}

export function getPresstexts() {
	return presstexts;
}

export function getMembers() {
	return members;
}

export function getLinks() {
	return links;
}

export function getSocialMediaLinks() {
	return socialMediaLinks;
}

