import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };
    
    // Basic synchronous scroll
    scrollToTop();
    
    // Fallback async scroll in case page height changes after render
    setTimeout(scrollToTop, 50);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
