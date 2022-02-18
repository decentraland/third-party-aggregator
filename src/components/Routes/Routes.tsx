import { Switch, Route, Redirect } from "react-router-dom";
import { locations } from "../../modules/locations";
import { Props } from "./Routes.types";

const Routes = ({ isConnected }: Props) => (
  <>
    <Switch>
      {!isConnected ? (
        <>
          <Route
            exact
            path={locations.signIn()}
            component={() => <div>Foo</div>}
          />
          <Redirect to={locations.signIn()} />
        </>
      ) : (
        <>
          <Route exact path={locations.root()} component={() => <div>Bar</div>} />
          <Redirect to={locations.root()} />
        </>
      )}
    </Switch>
  </>
);

export default Routes;
