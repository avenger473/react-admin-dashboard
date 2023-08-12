export const hostServer = "http://192.168.1.5:8080";
export const google_client_id =
  "963062247454-m7fo18guqi4t6e4lr8tdvvgcb8i5ldt7.apps.googleusercontent.com";

export const getAuthHeader = (user) => {
  return {
    headers: {
      Authorization: `Bearer ${user.access_token}`,
    },
  };
};
