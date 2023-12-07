import { withGoogleMap, withScriptjs, Marker } from 'react-google-maps';
const Map = () => {
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const GoogleMap = require('react-google-maps').GoogleMap;
	return (
		<>
			<GoogleMap
				defaultZoom={15}
				defaultCenter={{ lat: 21.027763, lng: 105.83416 }}
			>
				<Marker
					icon={{
						url: 'https://insulationpads.co.uk/wp-content/uploads/2017/10/Home.png',
						// scaledSize: new window.google.maps.Size(40, 40),
					}}
					position={{ lat: 21.027763, lng: 105.83416 }}
				/>
			</GoogleMap>
		</>
	);
};

export default withScriptjs(withGoogleMap(Map));
