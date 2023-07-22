import useAuth from "../composables/useAuth";

const LoginPage: React.FC = () => {
  const { googleLogin, logout, userInfo } = useAuth();

  const onGoogleLogin = () => {
    googleLogin()
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  };

  const onLogout = () => {
    logout()
      .then(() => {
        return;
      })
      .catch(() => {
        return;
      });
  };
  return (
    <>
      <div>
        Login Page <button onClick={onGoogleLogin}>Login With Google</button>
        <button onClick={onLogout}>Logout</button>
      </div>
      <pre>{userInfo?.displayName}</pre>
    </>
  );
};

export default LoginPage;
