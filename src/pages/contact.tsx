import React from "react";
import { Tooltip } from "react-tippy";
import { Icon } from "semantic-ui-react";

const ContactPage = () => {
  return (
    <div className="contact-page">
      <img className="background-image" src="http://bit.ly/2gPLxZ4" />
      <div className="card-wrapper">
        <img className="avatar" src="/assets/images/favicon.png" />
        <div className="card-description">
          <div className="name">Vlad MORA</div>
          <div className="description">
            I am a Junior Frontend Developer. I have basic knowledge in Python,
            HTML, CSS, Javascript, React and Typescript. I like to work on my
            own projects and find solutions to any issue I encounter. I hope to
            extend my skills and knowledge through practice and learning. If you
            wish to contact me, you can do so through the methods listed below.
          </div>
          <div className="contact-details">
            <Tooltip title="Email">
              <div className="contact-item email">
                <Icon name="mail" />
                vladmora4@gmail.com
              </div>
            </Tooltip>
            <Tooltip title="Discord">
              <div className="contact-item discord">
                <Icon name="discord" />
                Kristler#2551
              </div>
            </Tooltip>
            <Tooltip title="Instagram">
              <div className="contact-item instagram">
                <Icon name="instagram" />
                vlad_vladut_alex
              </div>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
