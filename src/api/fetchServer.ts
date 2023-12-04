export const fetchServer = (url: string) => {
	return fetch(process.env.NEXT_PUBLIC_API_URL + url);
};
