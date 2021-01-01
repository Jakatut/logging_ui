// @flow
import { useAuth0 } from "@auth0/auth0-react";

const logServiceEndpoint = process.env.REACT_APP_LOGGING_SERCVICE_URL;

const GetLogs = async (logType) => {
  const { getAccessTokenSilently } = useAuth0();
  const accessToken = await getAccessTokenSilently({
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    scope: process.env.REACT_APP_AUTH0_SCOPE,
  });

  const response = await fetch(logServiceEndpoint + "/" + logType, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = await response.json();
  return json.Data;
};

export default GetLogs;
