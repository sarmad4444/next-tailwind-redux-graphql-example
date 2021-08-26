import React from "react";
// import { Col, Container, Row } from "reactstrap";
import TournamentCard from "../../components/tournaments/tournamentCard";
import Loading from "../../components/layout/Loading";
import "./tournament.module.css";
import {useQuery} from "@apollo/client";
import {ALL_TOURNAMENTS} from "../../services/graphQL/queries/tournament";
export default function Index() {
  // fetching data
  const { data, error, loading } = useQuery(ALL_TOURNAMENTS);

  console.log(data);
  // main return
  return (
    <div className="flex flex-col w-full tournament">
      <header>
        <div> Tournaments</div>
        <div className="filter">
          <span>Filter Tournaments</span>
          <img src="/images/filter.svg" className="svg" alt=""></img>
        </div>
      </header>
      {/*{loading && <Loading height="70vh" />}*/}
      {/*{loading || (*/}

      {loading && <span>Loading....</span>}
      {loading || (
        <>
          <div className="flex w-full mt-5">
            <div className="flex flex-col">
              <div className="totalTitle"> {data?.tournamentMany.length || 0} tournament</div>
            </div>
          </div>
          <div className="flex w-full mt-5">
            {data?.tournamentMany.map((item, index) => {
              const isCenterdCard = index % 2 === 0;
              return (
                <TournamentCard
                  key={item._id}
                  isCenterdCard={isCenterdCard}
                  {...item}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
