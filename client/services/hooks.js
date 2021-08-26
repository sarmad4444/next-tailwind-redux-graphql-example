import { useEffect } from 'react'
import {useRouter} from 'next/router'
import {useQuery} from "@apollo/client";
import {AUTH_USER} from "./graphQL/queries/auth";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../stores/auth/actions";

export function useAuth({redirectTo = '/', redirectIfFound } = {}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data, error, loading } = useQuery(AUTH_USER);

  const user = data?.authUser;
  const finished = Boolean(!loading)
  const isLoggedIn = Boolean(data || false)

  useEffect(() => {
    if (!redirectTo || loading) return

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && isLoggedIn)
    ) {
      dispatch(login(user.token));
      router.push(redirectTo)
    }
  }, [redirectTo, redirectIfFound, finished, isLoggedIn])

  return error ? null : user
}

// export function useAuth({ redirectTo, redirectIfFound } = {}) {
//   const router = useRouter();
//   const { data, error, loading } = useQuery(AUTH_USER);
//
//   const user = data?.authUser;
//   const finished = Boolean(!loading)
//   const hasUser = Boolean(data || false)
//
//   useEffect(() => {
//     if (!redirectTo || loading) return
//     if (
//       // If redirectTo is set, redirect if the user was not found.
//       (redirectTo && !redirectIfFound && !hasUser) ||
//       // If redirectIfFound is also set, redirect if the user was found
//       (redirectIfFound && hasUser)
//     ) {
//       router.push(redirectTo)
//     }
//   }, [redirectTo, redirectIfFound, finished, hasUser])
//
//   return error ? null : user
// }