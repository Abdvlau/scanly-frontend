import React from "react";

// Menus
export const PRODUCTS = [
  { name: "Attendance Tracking", link: "#" },
];

export const RESOURCES = [
  { name: "About Us", link: "#" },
];

export const COMPANY = [
  { name: "Our Mission", link: "#" },
  
];

export const Icons = [
  { name: "logo-facebook", link: "#" },
  { name: "logo-twitter", link: "#" },
  { name: "logo-github", link: "#" },
  { name: "logo-linkedin", link: "#" },
  { name: "logo-instagram", link: "#" },
];

// Item component
const Item = ({ Links, title }) => {
  return (
    <ul>
      <h1 className="mb-1 font-semibold">{title}</h1>
      {Links.map((link) => (
        <li key={link.name}>
          <a
            className="text-gray-400 hover:text-blue-950 duration-300
          text-sm cursor-pointer leading-6"
            href={link.link}
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
};


// Footer component
const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="text-center bg-[#ffffff19] py-2">
        <h1
          className="lg:text-4xl text-3xl lg:leading-normal font-semibold"
        >
          <span className="text-blue-950 italic">Scanly</span> Your efficient solution for attendance tracking
        </h1>
      </div>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
      text-center pt-2 text-gray-400 text-sm "
      >
        <span>© 2024 Scanly. All rights reserved.</span>
        <span>Terms · Privacy Policy</span>
  
      </div>
    </footer>
  );
};

export default Footer;
