import { Switch, Route, Redirect } from "react-router-dom";
import { locations } from "../../modules/locations";
import CreateThirdParty from "../CreateThirdParty";
import { SignInPage } from "../SignIn";
import ThirdParties from "../ThirdParties";
import UpdateThirdParty from "../UpdateThirdParty";
import { Props } from "./Routes.types";

const Routes = ({ isConnected }: Props) => (
  <>
    <Switch>
      {!isConnected ? (
        <>
          <Route exact path={locations.signIn()} component={SignInPage} />
          <Redirect to={locations.signIn()} />
        </>
      ) : (
        <>
          <Route
            exact
            path={locations.thirdParties()}
            component={ThirdParties}
          />
          <Route
            exact
            path={locations.createThirdParty()}
            component={CreateThirdParty}
          />
          <Route
            exact
            path={locations.updateThirdParty()}
            component={UpdateThirdParty}
          />
          <Redirect to={locations.thirdParties()} />
        </>
      )}
    </Switch>
  </>
);

export default Routes;
