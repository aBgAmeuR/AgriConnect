import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { env } from '@/lib/env';

const center = {
  lat: 46.6,
  lng: 2.3
};

type Props = {
  isLoaded: boolean;
};

export const ProducersMap = ({ isLoaded }: Props) => {
  // const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map: any) {
    map.setZoom(6)
    // setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map: any) {
    // setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      center={center}
      onLoad={onLoad}
      // onUnmount={onUnmount}
    >
      { /* Child components, such as markers, info windows, etc. */}
      <></>
    </GoogleMap>
  ) : <></>
}

export default ProducersMap