import React from "react";
import { default as DCLSignIn } from "decentraland-dapps/dist/containers/SignInPage";
import Page from "../Page";

const SignIn = () => {
  return (
    <Page>
      <DCLSignIn />
    </Page>
  );
};

export default React.memo(SignIn);
