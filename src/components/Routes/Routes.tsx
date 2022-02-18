import { Switch, Route, Redirect } from "react-router-dom";
import { locations } from "../../modules/locations";
import { SignInPage } from "../SignIn";
import ThirdParties from "../ThirdParties";
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
          <Redirect to={locations.thirdParties()} />
        </>
      )}
    </Switch>
  </>
);

export default Routes;
