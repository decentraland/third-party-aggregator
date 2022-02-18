import React from "react";
import { Footer } from "decentraland-dapps/dist/containers";
import { Page as DCLPage } from "decentraland-ui";
import { Navbar } from "../Navbar";
import { Props } from "./Page.types";

import "./Page.css";

const Page = ({ children }: Props) => (
  <>
    <Navbar isFullscreen />
    <DCLPage className="Page" isFullscreen>
      {children}
    </DCLPage>
    <Footer isFullscreen />
  </>
);

export default React.memo(Page);
