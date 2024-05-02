import React from "react";
import { Footer } from "flowbite-react";
import Logo from "../images/Logo.svg";

export default function MyFooter() {
  return (
    <Footer className="fixed bottom-0 w-full border-t border-gray-200 bg-slate-300">
        <div className="w-full text-center px-4 lg:px-28">
          <div className="w-full justify-between sm:flex sm:items-center sm:justify-between">
            <Footer.Brand
              src={Logo}
              alt="Logo"
              name="Logo"
              className="w-24 h-auto mt-4"
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

