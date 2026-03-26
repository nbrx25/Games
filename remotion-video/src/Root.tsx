import React from "react";
import { Composition } from "remotion";
import { MyVideo } from "./MyVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="nbrx25Profile"
      component={MyVideo}
      durationInFrames={240}
      fps={30}
      width={1280}
      height={720}
    />
  );
};
