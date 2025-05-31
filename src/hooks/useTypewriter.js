import { useState, useEffect } from "react";

const useTypewriter = (text, speed = 70, variation = 30, onComplete) => {
  const [typedText, setTypedText] = useState("");
  
  useEffect(() => {
    let i = 0;
    let timeoutId;

    const typeEffect = () => {
      if (i <= text.length) {
        setTypedText(text.substring(0, i));
        i++;
        timeoutId = setTimeout(typeEffect, speed + Math.random() * variation);
      } else if (onComplete) {
        onComplete();
      }
    };

    typeEffect();
    return () => clearTimeout(timeoutId);
  }, [text, speed, variation, onComplete]);

  return typedText;
};

export default useTypewriter;
