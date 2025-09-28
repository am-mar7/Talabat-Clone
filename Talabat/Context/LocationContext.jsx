// LocationContextProvider.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

export const LocationContext = createContext({
  approx: { loading: true, data: null, error: null },
  detailed: { message: 'idle' },
  getDetailed: () => {}
});

export default function LocationContextProvider({ children }) {
  const [approx, setApprox] = useState({ loading: true, data: null, error: null });
  const [detailed, setDetailed] = useState({ message: 'idle' });

  useEffect(() => {
    if (localStorage.getItem('approx')){
      setApprox(JSON.parse(localStorage.getItem('approx')));
      console.log('we solve it' , JSON.parse(localStorage.getItem('approx')));      
      return
    }
    console.log('a7a');    
    let mounted = true;
    fetch('https://ipapi.co/json/')
      .then(response => response.json())
      .then(data => {
        if (!mounted) return;
        setApprox({ loading: false, data, error: null });
        // console.log('data' , { loading: false, data, error: null })        
        localStorage.setItem('approx' , JSON.stringify({ loading: false, data, error: null }))
      })
      .catch(() => {
        if (!mounted) return;    if (localStorage.getItem('approx')){
          setApprox(localStorage.getItem('approx'));
          console.log('we solve it' , approx);      
          return
        }
        console.log(approx);        
        setApprox({ loading: false, data: null, error: 'Failed to fetch approximate location' });
      });

    return () => { mounted = false; };
  }, []);

  const getDetailed = () => {
    if (!navigator.geolocation) {
      // keep detailed an object
      setDetailed(prev => ({ ...prev, message: "browser doesn't support geolocation" }));
      return;
    }
    if (localStorage.getItem('userArddess')){
      setDetailed(prev => ({
        ...prev,
        message: 'address_ready',
        address: localStorage.getItem('userArddess')
      }));
      console.log(' we solve it again');      
      return
    }

    setDetailed(prev => ({ ...prev, message: 'requesting_permission' }));

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      const acc = pos.coords.accuracy;

      // update with coordinates (keep it an object)
      setDetailed(prev => ({
        ...prev,
        message: 'got_coordinates',
        latitude: lat,
        longitude: lon,
        accuracy: acc
      }));

      // try reverse geocoding (address)
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
        );
        const j = await res.json();
        const addr = j.address || {};
        const pretty = [
          addr.road, addr.neighbourhood, addr.suburb,
          addr.city || addr.town || addr.village,
          addr.state, addr.country
        ].filter(Boolean).join(', ');

        setDetailed(prev => ({
          ...prev,
          message: 'address_ready',
          address: pretty
        }));
        localStorage.setItem('userAddress' , pretty)
      } catch (e) {
        setDetailed(prev => ({
          ...prev,
          message: 'address_failed',
          // coordinates remain present
        }));
      }
    }, (err) => {
      const codeMsg = err.code === 1 ? 'permission_denied'
                    : err.code === 2 ? 'position_unavailable'
                    : err.code === 3 ? 'timeout'
                    : 'unknown_error';
      setDetailed({ message: codeMsg, error: err.message || null });
    }, { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 });
  };

  return (
    <LocationContext.Provider value={{ approx, detailed, getDetailed }}>
      {children}
    </LocationContext.Provider>
  );
}

export const useLocation = () => useContext(LocationContext);
