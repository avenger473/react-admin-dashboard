export const hostServer = "http://192.168.1.6:8080";
export const google_client_id = "";

export const getAuthHeader = (user) => {
  return {
    headers: {
      Authorization: `Bearer ${user.access_token}`,
    },
  };
};
