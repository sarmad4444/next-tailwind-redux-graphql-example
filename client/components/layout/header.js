import React, { useState, useEffect } from "react";
import {useRouter} from 'next/router'
import Link from 'next/link'
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../stores/auth/actions";
import Login from '../auth/login';
import Register from "../auth/register";

export default function Header (props) {
  // const [token, setToken] = useState( null);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [ isLoggedIn, setIsLoggedIn ] = useState();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(localStorage.token || false);
  });

  const registerClicked = (e) => {
    setShowLoginModal(false);
    setShowRegistrationModal(true);
  }

  const loginClicked = (e) => {
    setShowRegistrationModal(false);
    setShowLoginModal(true);
  }

  const onLogout = async (e) => {
    dispatch(logout())
    // setShowLoginModal(true);

    await router.push('/')
  }

  return (
    <div className="flex p-4 w-full">
      {/* BEGIN: Modals */}
      <div>
        <input type="checkbox" readOnly={true} checked={showLoginModal} className="modal-toggle" />
        <div className="modal">
          {/* TODO: A temporary hacky way used to make backdrop dismiss for now */}
          <div className="h-screen w-screen absolute" onClick={(e) => setShowLoginModal(false)} />
          <div className="modal-box">
            <Login registerClicked={registerClicked}/>
          </div>
        </div>
      </div>

      <div>
        <input type="checkbox" readOnly={true} checked={showRegistrationModal} className="modal-toggle" />
        <div className="modal">
          {/* TODO: A temporary hacky way used to make backdrop dismiss for now */}
          <div className="h-screen w-screen absolute" onClick={(e) => setShowRegistrationModal(false)} />
          <div className="modal-box">
            <Register loginClicked={loginClicked} />
          </div>
        </div>
      </div>
      {/* END: Modals */}

      <div className="flex flex-grow">
        <h1 className="text-2xl font-black text-white">oCombat</h1>
      </div>
      <div className="flex flex-grow items-center gap-3 font-bold text-white">
        <Link href="/tournaments">Tournaments</Link>
        <Link href="/">Testimonials</Link>
        <Link href="/">Divisions</Link>
        <Link href="/">Rules</Link>
        <Link href="/">FAQ</Link>
      </div>

      {/* If user is not logged in */}
      {!isLoggedIn &&
      <div className="flex items-center text-xs gap-x-2">
        <button onClick={loginClicked} className="btn btn-ghost btn-sm text-white">Login</button>
        <button onClick={registerClicked} className="btn btn-accent btn-sm">Register</button>
      </div>
      }
      {/* If user has logged in */}
      {isLoggedIn &&
      <div className="flex items-center text-xs gap-x-2">
        <Link href="/profile">
          <button className="btn btn-outline btn-sm text-white">My Profile</button>
        </Link>
        <button onClick={onLogout} className="btn btn-outline btn-sm text-white">
          >
        </button>
      </div>
      }
    </div>
  );

}
