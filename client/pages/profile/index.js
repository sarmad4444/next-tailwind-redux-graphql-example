import React from "react";
import Link from "next/link";
import {useAuth} from "../../services/hooks"

import Header from "../../components/layout/header"

export default function Profile(props) {
  useAuth();

  return (
    <div className="flex flex-col bg-indigo-900 w-full">
      <Header className="bg-gray-500" />
      {/* Platform ID Notifier */}
      <div className="flex w-full py-2 gap-x-4 items-center justify-center bg-indigo-900 text-white">
        <div className="flex flex-col text-white">
          <h1 className="font-bold font-2xl">Missing platform ID</h1>
          <span className="font-xs">In order to participate in tournaments, you need to add platform ID</span>
        </div>

        <Link href="#">
          <a className="rounded-full bg-indigo-600 text-white font-medium text-xs px-4 py-2 uppercase">Add New</a>
        </Link>
      </div>

      <div className="flex flex-col items-center min-h-screen w-full p-4 bg-gray-200">
        <div className="flex flex-col rounded-xl max-w-3xl w-full bg-white">
          {/* Top Section */}
          <div className="flex items-center p-2 w-full border-b">
            <div className="flex flex-grow p-4">
              <h1 className="text-indigo-900 text-2xl font-bold">
                {/*{ user?.name }*/}
              </h1>
            </div>
            <div className="flex flex-col p-2 gap-y-1 text-center">
              <span className="text-2xl font-bold text-indigo-900">$ 0,00</span>
              <span className="text-xs font-medium text-indigo-900">Cash Balance</span>
              <a className="rounded-full border border-indigo-900 text-indigo-900 opacity-60 font-medium text-xs px-4 py-1 uppercase">Withdraw Funds</a>
            </div>
            <div className="flex flex-col p-2 gap-y-1 text-center">
              <span className="text-2xl font-bold text-indigo-900">$ 0,00</span>
              <span className="text-xs font-medium text-indigo-900">Credits</span>
              <a className="rounded-full border border-indigo-900 text-indigo-900 font-medium text-xs px-4 py-1 uppercase">Refer Friends</a>
            </div>
          </div>

          {/* Mid Section */}
          <div className="flex flex-col items-center p-2 w-full">
            <div className="flex flex-col gap-y-4 py-3 px-6 w-full max-w-lg bg-gray-200 rounded-xl">

              {/* Card */}
              <div className="flex items-center px-4 py-3 cursor-pointer gap-4 bg-white hover:bg-indigo-100 rounded-lg w-full text-indigo-900">
                <span className="text-5xl font-bold">A</span>
                <div className="flex flex-col flex-grow">
                  <span className="text-xl font-bold">My Tournaments</span>
                  <span className="text-xs text-gray-500">Manage your teams for upcoming tournaments</span>
                </div>
                <span className="text-2xl font-bold">
                    >
                  </span>
              </div>

              {/* Card */}
              <div className="flex items-center px-4 py-3 cursor-pointer gap-4 bg-white hover:bg-indigo-100 rounded-lg w-full text-indigo-900">
                <span className="text-5xl font-bold">B</span>
                <div className="flex flex-col flex-grow">
                  <span className="text-xl font-bold">Credits & Referrals</span>
                  <span className="text-xs text-gray-500">Invite friends to earn credit</span>
                </div>
                <span className="text-2xl font-bold">
                    >
                  </span>
              </div>

              {/* Card */}
              <div className="flex items-center px-4 py-3 cursor-pointer gap-4 bg-white hover:bg-indigo-100 rounded-lg w-full text-indigo-900">
                <span className="text-5xl font-bold">C</span>
                <div className="flex flex-col flex-grow">
                  <span className="text-xl font-bold">Transaction History</span>
                  <span className="text-xs text-gray-500">View your transaction history</span>
                </div>
                <span className="text-2xl font-bold">
                    >
                  </span>
              </div>

              {/* Card */}
              <div className="flex items-center px-4 py-3 cursor-pointer gap-4 bg-white hover:bg-indigo-100 rounded-lg w-full text-indigo-900">
                <span className="text-5xl font-bold">D</span>
                <div className="flex flex-col flex-grow">
                  <span className="text-xl font-bold">Account Information</span>
                  <span className="text-xs text-gray-500">Manage your account information</span>
                </div>
                <span className="text-2xl font-bold">
                    >
                  </span>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
