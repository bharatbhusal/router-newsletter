import React from "react";

import { BsLinkedin } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { IoLogoTwitter } from "react-icons/io";
import { FiInstagram } from "react-icons/fi";

const Footer = () => {
    return (
        <div className="footer-socials flex space-around">
            <a href="https://www.linkedin.com/in/bharatbhusal" target="_blank" rel="noreferrer">
                <BsLinkedin />
            </a>
            <a href="https://www.facebook.com/bharatbhusal78" target="_blank" rel="noreferrer">
                <BsFacebook />
            </a>
            <a href="https://github.com/bharatbhusal" target="_blank" rel="noreferrer">
                <BsGithub />
            </a>
            <a href="https://twitter.com/bharatbhusal02" target="_blank" rel="noreferrer">
                <IoLogoTwitter />
            </a>
            <a href="https://www.instagram.com/bharatbhusal/" target="_blank" rel="noreferrer">
                <FiInstagram />
            </a>
        </div>

    );
};

export default Footer;