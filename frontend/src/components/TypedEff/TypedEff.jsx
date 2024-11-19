import React, { useEffect, useRef } from "react";
import Typed from "typed.js";
import "./TypedEff.css";

const TypedEff = () => {
  const typedElementRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedElementRef.current, {
      strings: [
        '<span style="color: #023e8a;">Machine Learning !</span>',
        '<span style="color: #ad2831;">Data Science !</span>',
        '<span style="color: #FF9F1C;">Time Series Analysis !</span>',
        '<span style="color: #80B918;">Data Analysis !</span>',
        '<span style="color: #E07A5F;">Automation Models !</span>',
        '<span style="color: #ff8fab;">Data Visualisation !</span>',
      ],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 600,
      loop: true,
      onBegin: (self) => console.log("Typing started!", self),
      onComplete: (self) => console.log("Typing completed!", self),
    });

    return () => {
      typed.destroy();
    };
  }, []);
  return (
    <div>
      <h1 className="text">
        <span ref={typedElementRef}></span>
      </h1>
    </div>
  );
};

export default TypedEff;
