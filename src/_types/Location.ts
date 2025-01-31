export default interface locationProps {
	origin: {
		location_name: string;
		latitude: number | null;
		longitude: number | null;
	};
	destination: {
		location_name: string;
		latitude: number | null;
		longitude: number | null;
	};
}
