import React, { useCallback, useState } from 'react';
import { useController } from 'react-hook-form';
import { Input } from '@/components/ui/input'

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

type Props = {
  name: string;
  errors: any;
  control: any;
};

export function FileControllerInput({ name, errors, control }: Props) {
  const { field } = useController({ name, control });
  const [image, setImage] = useState();

  const onAvatarChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.[0]) {
      const base64 = await getBase64(event.target.files[0]);

      setImage(base64 as React.SetStateAction<undefined>);
      field.onChange(event.target.files);
    }
  }, []);

  return (
    <>
      <Input type="file" onChange={onAvatarChange} />
      <p className='text-destructive text-sm font-medium'>{errors[name]?.message}</p>
    </>
  );
}
