"use client";

import "./Loading.scss";

export default function Loading() {
  return (
    <div className="loading">
      <div className="loading__container">
        <div className="loading__bars-container">
          <div className="loading__bars">
            <span className="loading__bar"></span>
            <span className="loading__bar"></span>
            <span className="loading__bar"></span>
            <span className="loading__bar"></span>
            <span className="loading__bar"></span>
          </div>
          <div className="loading__bars">
            <span className="loading__bar"></span>
            <span className="loading__bar"></span>
            <span className="loading__bar"></span>
            <span className="loading__bar"></span>
            <span className="loading__bar"></span>
          </div>
        </div>

        <div className="loading__text">
          <span>Cargando...</span>
        </div>
      </div>
    </div>
  );
}
