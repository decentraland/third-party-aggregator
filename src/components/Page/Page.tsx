import React from "react";
import { Footer } from "decentraland-dapps/dist/containers";
import { Container, Page as DCLPage } from "decentraland-ui";
import { Navbar } from "../Navbar";
import { Props } from "./Page.types";

import "./Page.css";
import classNames from "classnames";

const Page = ({ children, className }: Props) => (
  <>
    <Navbar isFullscreen />
    <DCLPage className={classNames("Page", className)} isFullscreen>
      <Container>{children}</Container>
    </DCLPage>
    <Footer isFullscreen />
  </>
);

export default React.memo(Page);
