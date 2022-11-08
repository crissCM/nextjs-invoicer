import React, { useState } from "react";
import { animated, useSpring } from "react-spring";

const TextScroller = (props: TSProps) => {
  const { text } = props;
  const [key, setKey] = useState(1);

  const scrolling = useSpring({
    from: { transform: "translate(60%,0)" },
    to: { transform: "translate(-60%,0)" },
    config: { duration: 30000 },
    reset: true,
    // reverse: key % 2 == 0,
    onRest: () => {
      setKey(key + 1);
    },
  });

  return (
    <div className="TextScroller" key={key}>
      <animated.div style={scrolling}>{text}</animated.div>
    </div>
  );
};

type TSProps = {
  text: string;
};

export default TextScroller;
