import React from 'react';
import Loader from 'react-loader-spinner';

export default function MyLoader() {
  return (
    <Loader
      type="ThreeDots"
      color="var(--blue)"
      height={40}
      width={40}
      style={{ textAlign: 'center' }}
    />
  );
}
