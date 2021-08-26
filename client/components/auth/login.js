import React, {useState} from 'react'

import {useQuery, useLazyQuery} from "@apollo/client";
import {AUTH_LOGIN} from "../../services/graphQL/queries/auth";
import {useRouter} from "next/router";

export default function Login(props) {
    const [identity, setIdentity] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);
    const [_error, _setError] = useState(null);
    const [_loading, _setLoading] = useState(false);
    const router = useRouter();

    const { refetch: queryLogin } = useQuery(AUTH_LOGIN, { fetchPolicy: "network-only", skip: true });

    const onLoginClick = async (e) => {
        /* eslint-disable no-console */
        e.preventDefault()

        // Clearing previous errors
        _setError(null);

        // Input Validations
        if (!identity.trim()) {
            _setError('Please provide your email or username');
            return;
        } else if (!password.trim()) {
            _setError('You need to enter a password');
            return;
        }

        _setLoading(true);

        await queryLogin( {
            identity,
            password
        }).then(
          (res) => {
              let data = res.data.userLogin;
              localStorage.setItem('token', data.token);
              setToken(data.token);

              router.push('/profile');
          }
        ).catch(
          (error) => _setError(error.message)
        );

        _setLoading(false);
    }

    return (
        <div className="flex w-full justify-center">
            <div className="flex flex-col p-6 md:max-w-lg gap-y-6">
                <h1 className="text-4xl font-bold text-center">
                    Sign in to your account
                </h1>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email or Username</span>
                    </label>
                    <input className="input input-bordered" onChange={(e) => setIdentity(e.target.value ) } type="text" />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input className="input input-bordered" onChange={(e) => setPassword(e.target.value ) } type="password" />
                </div>

                <div className="flex flex-col text-center gap-y-2">
                    <button
                        className={`btn btn-accent ${_loading ? 'loading' : ''}`}
                        onClick={(e) => onLoginClick(e)}
                    >
                        Login
                    </button>
                    {_error &&
                        <span className="text-error">{_error}</span>
                    }
                    <span className="flex font-gray-500 gap-x-1 justify-center">
                    Doesn't have an account?
                    <button onClick={props.registerClicked} className="bg-transparent p-0 text-blue-500">Register</button>
                  </span>
                </div>
            </div>
        </div>

    )
}
