'use client';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import Loader from './Loader';
const CENTER = { lat: 52.11215635000001, lng: -2.326942450000001 };
const EMBED_URL = 'https://maps.google.com/maps?q=20+Graham+Rd,+Malvern+WR14+2HL,+United+Kingdom&z=16&output=embed';
function MapEmbed() {
    return (<iframe title='Pizza Fiesta location on map' src={EMBED_URL} className='w-full h-full border-0' loading='lazy' referrerPolicy='no-referrer-when-downgrade' allowFullScreen/>);
}
function GoogleMapView({ apiKey }) {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: apiKey,
        id: 'google-map-script',
    });
    if (loadError) {
        return <MapEmbed />;
    }
    if (!isLoaded) {
        return (<div className='w-full h-full min-h-[280px] flex items-center justify-center bg-gray-800'>
        <Loader className='h-full'/>
      </div>);
    }
    return (<GoogleMap zoom={16} center={CENTER} mapContainerClassName='w-full h-full' mapContainerStyle={{ width: '100%', height: '100%' }}/>);
}
const Map = () => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const hasValidKey = apiKey && apiKey !== 'placeholder';
    if (!hasValidKey) {
        return <MapEmbed />;
    }
    return <GoogleMapView apiKey={apiKey}/>;
};
export default Map;
