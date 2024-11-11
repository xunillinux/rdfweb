const concerts: Concert[] = [
	{ date: '2024-07-12',	name: 'Hallebar',	location: 'Buchs'	},
	{ date: '2024-07-14',	name: 'Herbstmesse',	location: 'Solothurn'	},
	{ date: '2025-02-04',	name: 'Kofmehl',	location: 'Solothurn'	},
	{ date: '2024-12-28',	name: 'Kiff',	location: 'Aarau'	},
];

export type Concert = {
	date: string;
	name: string;
	location: string;
}

export function getConcerts() {
	return concerts;
}
