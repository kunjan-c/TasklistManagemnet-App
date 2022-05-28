import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Tabular from "../Component/Tabular/Tabular";
import LoaderText from "../Component/UI/LoaderText/LoaderText";
import { Fragment } from "react";
export default function JokesSpot(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [jokesResult, setJokesResult] = useState([]);

  useEffect(() => {
    fetch(
      "https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=EN&amount=10"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setJokesResult(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <LoaderText />;
  } else {
    return (
      <Fragment>
        <Tabular></Tabular>
        <Box padding={3}>
          {jokesResult.jokes.map((jokeItem) => {
            let card = (
              <React.Fragment>
                <CardContent>
                  <p>{jokeItem.joke}</p>
                </CardContent>
              </React.Fragment>
            );
            return (
              <div key={jokeItem.id}>
                <Box sx={{ minWidth: 275 }}>
                  <Card variant="outlined">{card}</Card>
                </Box>
              </div>
            );
          })}
        </Box>
      </Fragment>
    );
  }
}
