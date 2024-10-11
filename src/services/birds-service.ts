export const getBirdsInfo = (message: string) => {
	return {
		message: message,
		data: [
			{
				name: "bird",
				age: 3,
			},
			{
				name: "bird2",
				age: 4,
			},
		],
	};
};
