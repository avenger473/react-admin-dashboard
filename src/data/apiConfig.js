export const hostServer = "http://192.168.1.7:8080";
export const google_client_id =
  "598165447701-2juuugp57c6molr9h65q524f2ggectji.apps.googleusercontent.com";

export const getAuthHeader = (user) => {
  return {
    headers: {
      Authorization: `Bearer ${user.access_token}`,
    },
  };
};
