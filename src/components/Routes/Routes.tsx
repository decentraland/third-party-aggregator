import { Switch, Route, Redirect } from "react-router-dom";
import { locations } from "../../modules/locations";
import { Props } from "./Routes.types";

const Routes = ({ isConnected }: Props) => {
  if (!isConnected) {
    return (
      <>
        <Switch>
          <Route
            exact
            path={locations.signIn()}
            render={() => <div>Foo</div>}
          />
          <Redirect to={locations.signIn()} />
        </Switch>
      </>
    );
  }

  return (
    <>
      <Switch>
        <Route exact path={locations.root()} render={() => <div>Bar</div>} />
        <Redirect to={locations.root()} />
      </Switch>
    </>
  );
};

export default Routes;
