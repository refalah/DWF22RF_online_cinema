import { useContext, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { Context } from "../context/context";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [state, dispatch] = useContext(Context);
  const { isLogin } = state;

  return (
    <Route
      {...rest}
      render={(props) =>
        isLogin ? <Component {...props} /> : <Redirect to="/"/>
      }
    />
  );
};

export default PrivateRoute;