import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { env } from '@/lib/env';

const center = {
  lat: 48.866667,
  lng: 2.333333
};

export const ProducersMap = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      tilt={0}
    >
      { /* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : <></>
}

export default ProducersMap
