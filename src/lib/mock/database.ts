const concerts: Concert[] = [
	{ date: new Date('2024-03-12'),	name: 'Hallebar',	location: 'Buchs'	},
	{ date: new Date('2023-05-14'),	name: 'Mida',	location: 'Aarau'	},
	{ date: new Date('2024-07-14'),	name: 'Herbstmesse',	location: 'Solothurn'	},
	{ date: new Date('2024-02-04'),	name: 'Kofmehl',	location: 'Solothurn'	},
	{ date: new Date('2024-12-28'),	name: 'Kiff',	location: 'Aarau'	},
	{ date: new Date('2025-01-10'),	name: 'Kreuz Kultur',	location: 'Solothurn'	},
];

const feature: Feature = {
	image: '/images/albumcover.jpg',
	heading: '"Dead Inside"',
	subheading: 'Debut Album',
	caption: 'Out Now',
	featureLinks: [
		{ text: 'Spotify', link: '#top' },
		{ text: 'Apple Music', link: '#top' },
		{ text: 'Youtube', link: '#top' },
		{ text: 'Tidal', link: '#top' }
	]
}

const presstexts: PressText[] = [
	{language: 'EN', text: 'After four years of energetic, legendary Robot Dog Funeral live shows, the time has finally come: The band will release their debut album "Dead Inside" on September 13, 2024.\n\nThe record features eleven songs about weltschmerz, love and inner turmoil, catchy guitar riffs and the pure emotions of an unmistakable voice. Dancey synthesizer chords meet powerful drums and explode into a unique style that floats around somewhere in alt rock universe.\n\nRobot Dog Funeral’s identity is four-fold: It’s what happens when a multigenre enthusiast and self-taught bassist and vocalist, a precision drummer with a metal background, an indie nerd with a synthesizer collection and a guitarist with a retro flair find each other.\n\nOver the course of five years, this constellation has created music that naturally and excitingly weaves together references from psychedelic rock, metal, rap, post-punk and indietronica to create the Robot Dog Funeral signature style. Sometimes the sound makes one whirl around and dance to fast rhythms, sometimes everything comes crashing down with distortion and screams, only to continue at half speed and with twice the intensity. The lyrics teem with social criticism and rebellion, but also go straight to the heart through coded messages to lovers and the world.\n\nBorn out of interregional friendships and since then active everywhere between and around Solothurn and Aarau, Robot Dog Funeral have become an integral part of the music scene in north-western Switzerland. Concerts at events such as the Summerside Festival, Träffpunkt Festival or Sub Divo, to name but a few, are complemented by appearances as the support band for Dirty Sound Magnet, at the Musig i de Altstadt Festival or at Kofmehl Solothurn.'},
	{language: 'DE', text: 'Nach vier Jahren energiegeladener, sagenumwobener Robot-Dog-Funeral-Liveshows ist es endlich so weit: Die Band veröffentlicht am 13. September 2024 ihr Debüt Album «Dead Inside».\n\nGenau hier liegt der Hund begraben: In elf Songs über Weltschmerz, Liebe und Zerrissenheit, in Ohrwurm-induzierenden Gitarrenriffs und in den puren Emotionen einer unverkennbaren Stimme. Tanzbare Synthesizer-Akkorde und wuchtige Drums treffen aufeinander und explodieren zu einem ganz einzigartigen Stil, der irgendwo im Universum des Alternative Rock herumschwirrt.\n\nRobot Dog Funeral ist das was passiert, wenn ein Mensch mit Multigenre-Enthusiasmus und einer Leidenschaft für Bass und Gesang, ein Präzisionsschlagzeuger mit Metal-Hintergrund, ein Indie-Nerd mit Synthesizer-Sammlung und ein Gitarrist mit Retro-Flair zusammenfinden.\n\nIn dieser Konstellation entstand über fünf Jahre hinweg Musik, die ihre Referenzen aus Psychedelic Rock, Metal, Rap, Postpunk und Indietronica natürlich und auf aufregende Art zu einer neuen, eigenen Handschrift zusammenwebt. Mal lässt der Sound einen zu schnellen Rhythmen herumwirbeln und tanzen, mal kracht alles unter Verzerrung und Schreien zusammen, um in halbem Tempo und in doppelter Intensität weiterzumachen. Die Texte strotzen vor Gesellschaftskritik und Rebellion, gehen aber auch mitten ins Herz mit verschlüsselten Nachrichten an Geliebte und die Welt.\n\nEntstanden aus interregionalen Freundschaften und seither aktiv überall zwischen und um Solothurn und Aarau sind Robot Dog Funeral zu einem festen Bestandteil der Nordwestschweizer Musikszene herangewachsen. Konzerte an Veranstaltungen wie dem Summerside Festival, Träffpunkt Festival oder Sub Divo, um nur einige zu nennen, ergänzen Auftritte als Vorband von Dirty Sound Magnet, am Musig i de Altstadt Festival oder im Kofmehl Solothurn.'},
];

export type Concert = {
	date: Date;
	name: string;
	location: string;
}

export type Feature = {
	image: string; // should be blob,
	heading: string;
	subheading: string;
	caption: string;
	featureLinks: FeatureLink[];
}

export type FeatureLink = {
	text: string;
	link: string;
}

export type PressText = {
	language: string;
	text: string;
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
