import React from "react";
import "./loading.module.css";
export default function Loading({ height = "40vh" }) {
  return (
    <div className="centerFlex" style={{ height: height }}>
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    </div>
  );
}
