import React from "react";

import ProjectContent from "@organisms/ProjectContent";

const IndexPage = () => {
  return (
    <div>
      <div className="header">
        <div id="primary-content" className="primary-content">
          <div className="inner-header flex">
            <p className="line-1 anim-typewriter">
              Welcome to my Portfolio. I hope you like it :)
            </p>
            <a className="custom-button continue-btn" href="#secondary-content">
              Click to continue
            </a>
          </div>

          <div>
            <svg
              className="waves"
              xmlns="http://www.w3.org/2000/svg"
              xlinkHref="http://www.w3.org/1999/xlink"
              viewBox="0 24 150 28"
              preserveAspectRatio="none"
              shape-rendering="auto"
            >
              <defs>
                <path
                  id="gentle-wave"
                  d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
                />
              </defs>
              <g className="parallax">
                <use
                  xlinkHref="#gentle-wave"
                  x="48"
                  y="0"
                  fill="rgba(255,255,255,0.7"
                />
                <use
                  xlinkHref="#gentle-wave"
                  x="48"
                  y="3"
                  fill="rgba(255,255,255,0.5)"
                />
                <use
                  xlinkHref="#gentle-wave"
                  x="48"
                  y="5"
                  fill="rgba(255,255,255,0.3)"
                />
                <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
              </g>
            </svg>
          </div>

          <div className="content flex">
            <p>
              <b>&gt; Home</b> | M Vlad's Portfolio
            </p>
          </div>
        </div>
        <div id="secondary-content" className="secondary-content">
          <ProjectContent />
          <a
            className="custom-button scroll-back heart-pulse"
            href="#primary-content"
          >
            Scroll up
          </a>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
