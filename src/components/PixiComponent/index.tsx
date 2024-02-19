import React, { useEffect, useState } from "react";
import { Stage, Sprite, withPixiApp } from "@pixi/react";
import { BlurFilter } from "pixi.js";

const BunnySprite = ({ app }) => {
  const [rotation, setRotation] = useState(0);
  const blurFilter = new BlurFilter(1);

  useEffect(() => {
    const tickerCallback = (delta) => setRotation((prev) => prev + 0.1 * delta);
    app.ticker.add(tickerCallback);

    return () => app.ticker.remove(tickerCallback);
  }, [app.ticker]);

  return (
    <Sprite
      image="https://pixijs.io/examples/examples/assets/bunny.png"
      x={50}
      y={50}
      anchor={0.5}
      rotation={rotation}
      filters={[blurFilter]}
    />
  );
};

const BunnyWithApp = withPixiApp(BunnySprite);

const PixiComponent = () => {
  return (
    <Stage width={100} height={200} options={{ preserveDrawingBuffer: true }}>
      <BunnyWithApp />
    </Stage>
  );
};

export default PixiComponent;
