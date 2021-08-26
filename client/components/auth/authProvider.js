import React from "react";
import {useAuth} from "../../services/hooks";

export default function AuthProvider({Component, props}) {
  const user = useAuth({ redirectTo: '/' });
  console.log(user);

  // TODO: Not implemented yet
  return (
    <div>
      {user && <Component {...props} />}
    </div>
  ), user
}