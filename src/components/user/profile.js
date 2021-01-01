import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@material-ui/core";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <Box>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </Box>
    )
  );
};

export default Profile;
