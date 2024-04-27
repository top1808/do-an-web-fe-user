export async function GET() {
	const res = await fetch('http://localhost:8000/cart', {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'GET',
	});
	const data = await res.json();
	console.log(data);

	return Response.json({ data });
}
