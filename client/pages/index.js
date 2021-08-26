import Head from 'next/head'
import Link from 'next/link'
import Header from "../components/layout/header"
import {useQuery} from "@apollo/client";
import {ALL_TOURNAMENTS} from "../services/graphQL/queries/tournament";


export default function Home(props) {
  // Getting all tournaments
  const { data, error, loading } = useQuery(ALL_TOURNAMENTS);

  function componentDidMount () {
    if(props.isLoggedIn === true){
      Router.pushRoute('/');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Head>
        <title>oCombat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full">
        <div className="overflow-hidden">
          <div className="flex flex-col bg-gradient-to-r from-purple-500 to-indigo-500 items-center min-h-screen justify-center">

            <Header />

            {/* Content */}
            <div className="flex flex-grow items-center px-16">
              <div className="flex flex-col w-3/5 gap-y-8">
                <h1 className="text-8xl font-bold text-white">
                  Call of Duty tournaments for all skill levels
                </h1>

                <div className="flex gap-x-4">
                  <Link href='/tournaments'>
                    <button className="btn btn-outline">
                      Find a tournament
                    </button>
                  </Link>

                  <button className="btn">
                    Join us on Discord
                  </button>
                </div>
              </div>

              <img src="/images/home-image.png" className="w-1/2 self-end" alt="COD"/>

            </div>

          </div>
        </div>

        <div className="flex flex-col p-16 gap-y-16 w-full items-center justify-center">
          <h2 className="text-5xl font-bold">
            Upcoming tournaments
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {!loading && data.tournamentMany.map((tournament) => (
              <div key={tournament._id} className="flex flex-col rounded-lg p-8 bg-indigo-700 shadow-md text-white text-lg">
                <span>
                  Mode: {tournament.mode}
                </span>
                <span>
                  Scoring: {tournament.scoring}
                </span>
                <span>
                  Prize: {tournament.prize}
                </span>
                <span>
                  Date: {tournament.starting}
                </span>
              </div>
            ))}

          </div>
        </div>

      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t">
        oCombat
      </footer>
    </div>
  )
}
