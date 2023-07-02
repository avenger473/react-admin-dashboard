import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { google_client_id } from "../../data/apiConfig";

export default function GoogleLoginCmp() {
  return (
    <GoogleOAuthProvider clientId={google_client_id}>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        size="large"
      />
    </GoogleOAuthProvider>
  );
}
