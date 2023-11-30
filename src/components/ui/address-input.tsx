import React, { useState, useRef, useEffect } from 'react';
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { Input } from '@/components/ui/input';

type AddressProps = {
  label: string;
  value: string;
} | null;

type AddressInputProps = {
  onChange: (address: { address: string, lat: number, lng: number }) => void;
  isLoaded: boolean;
};

const AddressInput = ({ onChange, isLoaded }: AddressInputProps) => {
  const [value, setValue] = useState<AddressProps>(null);

  React.useEffect(() => {
    if (value) {
      geocodeByAddress(value.label)
        .then(results => getLatLng(results[0]))
        .then(({ lat, lng }) => onChange({ address: value.label, lat, lng }))
        .catch(error => console.error(error));
    }
  }, [value]);

  if (!isLoaded) return <Input placeholder='Adresse' disabled></Input>;

  return (
    <GooglePlacesAutocomplete
      selectProps={{
        value,
        onChange: setValue,
        styles: {
          control: (provided) => ({
            ...provided,
            padding: '0 12px',
            minHeight: '36px',
            boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            border: '1px solid #E4E4E7',
            borderRadius: '6px',
            '&:hover': {
              borderColor: '#E4E4E7',
            },
          }),
          valueContainer: (provided) => ({
            ...provided,
            padding: '0',
          }),
          input: (provided) => ({
            ...provided,
            width: '100%',
            height: '26px',
            margin: '0',
            padding: '0',
            color: '#1a202c',
            fontSize: '14px',
            lineHeight: '1.25rem',
            fontWeight: '500',
          }),
          indicatorsContainer: (provided) => ({
            ...provided,
            padding: '0',
          }),
          indicatorSeparator: (provided) => ({
            ...provided,
            padding: '0',
          }),
          dropdownIndicator: (provided) => ({
            ...provided,
            padding: '0',
            paddingLeft: '4px',
          }),
          placeholder: (provided) => ({
            ...provided,
            fontSize: '14px',
            lineHeight: '1.25rem',
            fontWeight: '500',
          }),
        },
        placeholder: 'Adresse',
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
