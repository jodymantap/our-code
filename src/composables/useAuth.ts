import { useEffect, useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import { ErrorModel } from "../interfaces/error";
import { UserModel } from "../interfaces/user";

type GoogleLoginMethod = () => Promise<unknown>;
type LogoutMethod = () => Promise<void>;

interface AuthResult {
  googleLogin: GoogleLoginMethod;
  logout: LogoutMethod;
  userInfo: UserModel | null | undefined;
}

const useAuth = (): AuthResult => {
  const [userInfo, setUserInfo] = useState<UserModel | null>();

  const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider);
      return response;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const logout = async (): Promise<void> => {
    await signOut(auth);
  };

  useEffect(() => {
    const getUserInfo = () => {
      const user = auth?.currentUser;
      if (user) {
        const userData: UserModel = {
          displayName: user?.displayName ?? null,
          photoURL: user?.photoURL ?? undefined,
          email: user?.email ?? null,
        };
        setUserInfo(userData);
      } else {
        setUserInfo(null);
      }
    };

    const unsubscribe = auth.onAuthStateChanged(getUserInfo);

    return () => unsubscribe();
  }, []);
  return { googleLogin, logout, userInfo };
};

export default useAuth;
