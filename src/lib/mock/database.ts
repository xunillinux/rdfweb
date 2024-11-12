const concerts: Concert[] = [
	{ date: new Date('2024-07-12'),	name: 'Hallebar',	location: 'Buchs'	},
	{ date: new Date('2024-07-14'),	name: 'Herbstmesse',	location: 'Solothurn'	},
	{ date: new Date('2023-02-04'),	name: 'Kofmehl',	location: 'Solothurn'	},
	{ date: new Date('2023-12-28'),	name: 'Kiff',	location: 'Aarau'	},
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
	{language: 'EN', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. \n\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. \n\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
	{language: 'DE', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. \n\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. \n\n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
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
