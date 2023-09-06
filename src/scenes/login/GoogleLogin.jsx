import { GoogleLogin } from "@react-oauth/google";

export default function GoogleLoginCmp({ handleSubmit }) {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        handleSubmit(credentialResponse.credential);
      }}
      onError={() => {
        alert("Login Failed! Retry");
      }}
      size="large"
    />
  );
}
