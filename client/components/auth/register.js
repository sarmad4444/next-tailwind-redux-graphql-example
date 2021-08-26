import React, {useState} from 'react'
import {useMutation} from "@apollo/client";
import {AUTH_REGISTER} from "../../services/graphQL/mutations/auth";

export default function Register (props) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [_error, _setError] = useState(null);
    const [_loading, _setLoading] = useState(false);

    const [register] = useMutation(AUTH_REGISTER);

    const onRegisterClick = async (e) => {
        /* eslint-disable no-console */
        e.preventDefault();

        // Clearing previous errors
        _setError(null);

        // Input Validations
        if (!name.trim()) {
            _setError('Name cannot be empty');
            return;
        } else if (!email.trim()) {
            _setError('Please provide your email');
            return;
        } else if (!password.trim()) {
            _setError('You need to enter a password')
            return;
        }

        _setLoading(true);

        await register({
            variables: {
                user: {
                    name,
                    email,
                    password
                }
            }
        }).then(
          (res) => {
              props.loginClicked();
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
                    Create an account
                </h1>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Full Name</span>
                    </label>
                    <input className="input input-bordered" onChange={(e) => setName(e.target.value ) } type="text" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input className="input input-bordered" onChange={(e) => setEmail(e.target.value ) } type="text" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input className="input input-bordered" onChange={(e) => setPassword(e.target.value ) } type="password" />
                </div>

                <label className="font-sm text-center font-semibold">
                    By creating an account, you agree to oCombat's <span className="text-blue-500">terms</span> and <span className="text-blue-500">privacy policy</span>
                </label>

                <div className="flex flex-col text-center gap-y-2">
                    <button
                        className={`btn btn-accent ${_loading ? 'loading' : ''}`}
                        onClick={(e) => onRegisterClick(e)}
                    >
                        Register
                    </button>
                    {_error &&
                        <span className="text-error">{_error}</span>
                    }
                    <span className="flex font-gray-500 gap-x-1 justify-center">
                    Have an account?
                    <button onClick={props.loginClicked} className="bg-transparent p-0 text-blue-500">Log In</button>
                  </span>
                </div>
            </div>
        </div>

    )
}
