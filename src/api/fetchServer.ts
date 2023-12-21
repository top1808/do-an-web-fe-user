export const fetchServer = (url: string, options?: RequestInit) => {
	return fetch(process.env.API_URL + url, { cache: 'no-store', ...options });
};
