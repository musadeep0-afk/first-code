import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { UAParser } from 'ua-parser-js';

export default function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    const trackPageView = async () => {
      try {
        const parser = new UAParser();
        const result = parser.getResult();
        
        let country = 'Unknown';
        let city = 'Unknown';
        
        // Try to get location using a free IP API (optional, might fail due to adblockers)
        try {
          const res = await fetch('https://ipapi.co/json/');
          if (res.ok) {
            const data = await res.json();
            country = data.country_name || 'Unknown';
            city = data.city || 'Unknown';
          }
        } catch (e) {
          console.warn('Could not fetch location data');
        }

        await addDoc(collection(db, 'analytics'), {
          type: 'page_view',
          path: location.pathname,
          device: result.device.type || 'desktop',
          browser: result.browser.name || 'Unknown',
          os: result.os.name || 'Unknown',
          country,
          city,
          createdAt: serverTimestamp()
        });
      } catch (error) {
        console.error('Error tracking analytics:', error);
      }
    };

    // Only track if not on dashboard or login
    if (!location.pathname.startsWith('/dashboard') && !location.pathname.startsWith('/login')) {
      trackPageView();
    }
  }, [location.pathname]);

  return null;
}
