import useAuth from "../composables/useAuth";
import GoogleButton from "react-google-button";

const LoginPage: React.FC = () => {
  const { googleLogin } = useAuth();

  const onGoogleLogin = () => {
    googleLogin()
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <>
      <div>
        <GoogleButton onClick={onGoogleLogin}></GoogleButton>
      </div>
    </>
  );
};

export default LoginPage;
