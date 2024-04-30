import React from "react";
import { Footer } from "flowbite-react";
import Logo from "../images/Logo.svg";

export default function MyFooter() {
  return (
    <Footer container>
      <div className="w-full text-center">
        <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
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
