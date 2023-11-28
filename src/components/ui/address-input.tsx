import React, { useState, useRef, useEffect } from 'react';
import { useLoadScript } from '@react-google-maps/api';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { env } from '@/lib/env';

// Déclarez le type Library pour les bibliothèques Google Maps
type Library = "places";

const libraries: Library[] = ["places"];

type AddressProps = {
  label: string;
  value: string;
} | null;

type AddressInputProps = {
  onChange: (address: { address: string, lat: number, lng: number }) => void;
};

const AddressInput = ({ onChange }: AddressInputProps) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [value, setValue] = useState<AddressProps>(null);

  React.useEffect(() => {
    if (value) {
      geocodeByAddress(value.label)
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) => onChange({ address: value.label, lat, lng }))
        .catch(error => console.error(error));
    }
  }, [value]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GooglePlacesAutocomplete
      selectProps={{
        value,
        onChange: setValue,
        styles: {
          control: (provided) => ({
            ...provided,
            height: '32px',
            boxSizing: 'border-box',
            borderRadius: '4px',
          }),
          input: (provided) => ({
            ...provided,
            width: '100%',
            fontSize: '1rem',
            color: '#1a202c',
          }),
          option: (provided) => ({
            ...provided,
            borderBottom: '1px solid #e2e8f0',
          }),
        },
      }}
      apiOptions={{ language: 'fr', region: 'fr' }}
      autocompletionRequest={
        {
          componentRestrictions: {
            country: ['fr'],
          },
        }
      }
      debounce={500}
    />
  );
};

export default AddressInput;
