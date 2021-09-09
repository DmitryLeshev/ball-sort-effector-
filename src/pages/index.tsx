import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { useStore } from "effector-react";

import { model } from "entities/game";

import { paths } from "shared/config";
import { useRouter } from "shared/hooks";

import LogInPage from "./login";
import HomePage from "./home";
import GamePage from "./game";

export const Routing = ({ isAuth }: { isAuth: boolean }) => {
  const state = useStore(model.stores.$state);
  const { history } = useRouter();

  const renderRoutes = isAuth ? IS_AUTH_ROUTES : IS_NOT_AUTH_ROUTES;
  const rederictLink = isAuth ? "/home" : "/login";

  useEffect(() => {
    if (!isAuth) return;
    if (state === "ingame") return history.push("/game");
    if (state === "start") return history.push("/home");
  }, [state]);

  return (
    <Switch>
      {renderRoutes.map((route) => {
        return <Route key={route.path} {...route} />;
      })}
      <Redirect to={rederictLink} />
    </Switch>
  );
};

const IS_AUTH_ROUTES = [
  { exact: true, path: paths.home(), component: HomePage },
  { exact: true, path: paths.game(), component: GamePage },
];

const IS_NOT_AUTH_ROUTES = [
  { exact: true, path: paths.login(), component: LogInPage },
];
