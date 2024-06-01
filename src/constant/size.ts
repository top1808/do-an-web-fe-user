export interface TypeSizeShoe {
	value: number | string;
	minLength?: number;
	maxLength?: number;
	minWidth?: number;
	maxWidth?: number;
	minHeight?: number;
	maxHeight?: number;
	minWeight?: number;
	maxWeight?: number;
}
export interface SIZE {
	name: string;
	sizes: TypeSizeShoe[];
	type: string;
}

// table size shoe
const tableTemp: SIZE[] = [
	{
		name: 'Việt Nam',
		sizes: [
			{
				value: 38,
				minLength: 38,
				maxLength: 38,
				minWidth: 38,
				maxWidth: 38,
			},
			{
				value: 38,
				minLength: 38,
				maxLength: 38,
				minWidth: 38,
				maxWidth: 38,
			},
		],
		type: 'shoe',
	},
	{
		name: 'US',
		sizes: [
			{
				value: 'S',
				minWeight: 38,
				maxWeight: 40,
				minHeight: 150,
				maxHeight: 155,
			},
			{
				value: 'M',
				minWeight: 40,
				maxWeight: 45,
				minHeight: 160,
				maxHeight: 165,
			},
		],
		type: 'clothing',
	},
];
