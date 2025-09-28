import React, { useContext } from 'react';
import { LocationContext } from '../../../Context/LocationContext';
import NotProvided from '../NotProvided/NotProvided';

export default function ProtectedRoute({ children }) {
  const { approx } = useContext(LocationContext);

  const countries = [
    'Kuwait', 'KSA', 'Bahrain', 'UAE',
    'Oman', 'Qatar', 'Jordan', 'Egypt'
  ];
  
  // still loading? show loader
  if (approx.loading) {
    return <p className='p-10 font-bold text-5xl text-orange-500 text-center'>Checking your location...</p>;
  }

  // failed to fetch?
  if (approx.error) {
    console.log(approx.error)
    return <p className='p-10 font-bold text-5xl text-orange-500 text-center'>Error: {approx.error}</p>;
  }

  // check if country allowed
  if (countries.includes(approx?.data?.country_name)) {
    localStorage.setItem('approxLocation' , approx)
    return <>{children}</>;
  }

  return <NotProvided/>;
}
