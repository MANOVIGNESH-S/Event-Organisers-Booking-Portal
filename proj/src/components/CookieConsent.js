import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import '../CookieConsent.css'; // Optional: for styling your cookie consent banner

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(true); // Set to true to always show in development

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      // Always show banner in development
      setIsVisible(true);
    } else {
      const consent = Cookies.get('cookieConsent');
      if (!consent) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  }, []);

  const handleAccept = () => {
    Cookies.set('cookieConsent', 'true', { expires: 365 });
    setIsVisible(false);
  };

  return (
    isVisible && (
      <div className="cookie-consent">
        <p>
          We use cookies to improve your experience. By continuing to visit this site, you agree to our use of cookies.
        </p>
        <button onClick={handleAccept}>Accept</button>
      </div>
    )
  );
};

export default CookieConsent;
