import useAuth from "../composables/useAuth";
import GoogleButton from "react-google-button";
import usePageTitle from "../composables/usePageTitle";

const LoginPage: React.FC = () => {
  usePageTitle("Our Code - Login");
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
