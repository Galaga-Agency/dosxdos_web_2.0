"use client";

import React from "react";
import "./page.scss";
import SmoothScrollWrapper from "@/components/SmoothScrollWrapper";

const Home: React.FC = () => {
  return (
    <SmoothScrollWrapper showBackToTop={false}>
      <div className="homepage">
        <div className="homepage__bg-shape"></div>
      </div>
    </SmoothScrollWrapper>
  );
};

export default Home;
