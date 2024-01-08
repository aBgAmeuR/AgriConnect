import React from 'react'
import { GoogleMap, InfoWindow, Marker } from '@react-google-maps/api';
import { Producer } from './producers-list-map';

const center = {
  lat: 46.6,
  lng: 2.3
};

type Props = {
  isLoaded: boolean;
  data: Producer[];
  selected: Producer | null;
  setSelected: React.Dispatch<React.SetStateAction<Producer | null>>;
};

export const ProducersMap = ({ isLoaded, data, selected, setSelected }: Props) => {
  const [map, setMap] = React.useState(null)
  
  const onLoad = React.useCallback(function callback(map: any) {
    map.setZoom(6)
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  const centerPin = (producer: Producer) => {
    if (map) {
      (map as google.maps.Map).setZoom(12);
      (map as google.maps.Map).setCenter({ lat: producer.latitude, lng: producer.longitude })
    }
  }

  React.useEffect(() => {
    if (selected) {
      centerPin(selected)
    }
  }, [selected])

  return isLoaded ? (
    <GoogleMap
      center={center}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {data ? data.map((producer: Producer) => (
        <Marker
          key={producer.id}
          position={{ lat: producer.latitude, lng: producer.longitude }}
          clickable={true}
          onClick={() => setSelected(producer)}
        >
          {selected === producer && (
            <InfoWindow>
              <div className="flex flex-col gap-2">
                <h2 className="text-base">{producer.name}</h2>
                <p className="text-sm text-muted-foreground">{producer.address}</p>
              </div>
            </InfoWindow>
          )}
        </Marker>
      )) : <></>}

    </GoogleMap>
  ) : <></>
}

export default ProducersMap