import React from "react";
import { Footer } from "flowbite-react";
import Logo from "../images/Logo.svg";

export default function MyFooter() {
  return (
    <Footer className="w-full  border-gray-200 bg-slate-300">
      <div className="w-full text-center px-4 lg:px-28">
        <div className="w-full justify-between flex items-center content-center py-2 ">
          <Footer.Brand
            src={Logo}
            alt="Logo"
            name="Logo"
            className="w-24 h-auto"
          />
          <Footer.LinkGroup>
            <Footer.Link href="#">About</Footer.Link>
            <Footer.Link href="#">Contact</Footer.Link>
          </Footer.LinkGroup>
        </div>
        <Footer.Divider />
        <Footer.Copyright href="#" by="PPy" year={2024} />
      </div>
    </Footer>
  );
}

