import { useEffect, useRef, useState } from "react";

function useElementOnScreen (options) {
  const ref = useRef(null);
  const [ isVisible, setIsVisible ] = useState(false);
  
  function callback (entries) {
    const [ entry ] = entries;
    setIsVisible(entry.isIntersecting);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current)
    }
  }, [ref, options, callback]);

  return [ ref, isVisible ];

}

export default useElementOnScreen;
