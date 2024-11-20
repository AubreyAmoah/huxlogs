"use client";
import axios from "axios";
import { createContext, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter, usePathname } from "next/navigation";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState({});
  const [authLoading, setAuthLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [signUpLoading, setSignUpLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [signUpError, setSignUpError] = useState(null);

  const onLogout = async () => {
    try {
      await axios.get("/api/auth/logout");
      toast.success("Logout Success!");
      return router.push("/");
    } catch (error) {
      console.error(error);
      return toast.error(error?.response?.data?.error | "An error occurred");
    }
  };
  const getUser = async () => {
    try {
      setAuthLoading(true);
      const res = await axios.get("/api/me");

      //   if (!res.data || !pathname.startsWith("/pages/reset")) {
      //     router.push("/");
      //   }
      return setUser(res.data);
    } catch (error) {
      //   if (!pathname.startsWith("/pages/reset")) router.push("/");
      setAuthError(error);
      console.log(error);
    } finally {
      setAuthLoading(false);
    }
  };

  const onLogin = async (user) => {
    try {
      setLoginLoading(true);
      const res = await axios.post("/api/auth/signin", user);

      if (res.status === 200) toast.success(res.data.message);
      router.push("/pages/otp");
    } catch (error) {
      setLoginError(error);
      console.error(error.response.data || error);
      return toast.error(error.response.data.error || "An error occurred");
    } finally {
      setLoginLoading(false);
    }
  };

  const validateLogin = async (otpToken) => {
    try {
      setLoginLoading(true);
      const res = await axios.post("/api/auth/validatesignin", {
        otpToken: Number(otpToken),
      });

      if (res.status === 200)
        toast.success("Validation succesful redirecting you to dashboard");
      router.push("/pages/dashboard");
    } catch (error) {
      setLoginError(error);
      console.error(error.response.data || error);
      return toast.error(error.response.data.error || "An error occurred");
    } finally {
      setLoginLoading(false);
    }
  };

  const onSignup = async (user) => {
    try {
      setSignUpLoading(true);
      const res = await axios.post("/api/auth/signup", user);

      if (res.status === 201) {
        toast.success("SignUp sucessful");
        onLogin(user);
      }
    } catch (error) {
      setSignUpError(error);
      console.error(error.response.data || error);
      return toast.error(error.response.data.error || "An error occurred");
    } finally {
      setSignUpLoading(false);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        loginLoading,
        signUpLoading,
        onLogin,
        onSignup,
        onLogout,
        validateLogin,
        authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
