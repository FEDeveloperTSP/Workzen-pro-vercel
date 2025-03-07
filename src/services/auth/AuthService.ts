import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useMutation } from "react-query";
import { apiRoutes } from "../apiRoutes";
import axios from "../axiosService";
import {
  confirmOTP,
  confirmPayment,
  loginUser,
  RegisterUser,
} from "./authSlice";
import { AppDispatch } from "../store";
import toast from "react-hot-toast";

export interface Register {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  address: string;
  postal_code: string;
  company_name: string;
  phone_number: string;
}
export const authService = {
  login: async (email: string, password: string, router: any) => {
    try {
      const response = await axios.post(apiRoutes.auth.login, {
        email,
        password,
      });
      console.log("response login", response.data);
      Cookies.set("access_token", response.data.data, {
        expires: 7,
        path: "/",
      });
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || "Login failed"; // Handle API errors
    } finally {
      router.push("/company/dashboard");
    }
  },
  register: async (data: Register) => {},
};
export const useLoginMutation = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useMutation(
    async ({ email, password }: { email: string; password: string }) => {
      // Wait for the API response before proceeding
      return await dispatch(loginUser({ email, password })).unwrap();
    },
    {
      onSuccess: (data) => {
        console.log("Login successful!", data);
      },
      onError: (error: any) => {
        console.error(
          "Login failed:",
          error?.response?.data?.message || "Error"
        );
      },
    }
  );
};
export const useRegisterMutation = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useMutation(
    async (data: Register) => {
      return dispatch(RegisterUser(data)).unwrap(); // Wait for the response
    },
    {
      onSuccess: () => {
        // toast.success("OTP dispatched, Check your email address")
      },
      onError: (error: any) => {
        console.error("Registration failed:", error);
        toast.error(error);
      },
    }
  );
};
export const useOTPMutation = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useMutation(
    async ({ otp, email }: { otp: number; email: string }) => {
      return dispatch(confirmOTP({ otp: otp, email: email })).unwrap(); // Wait for the response
    },
    {
      onSuccess: () => {
        // toast.success("OTP dispatched, Check your email address")
      },
      onError: (error: any) => {
        console.error("Registration failed:", error);
        toast.error(error);
      },
    }
  );
};
export const usePaymentMutation = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useMutation(
    async ({ id }: { id: string }) => {
      // Wait for the API response before proceeding
      return await dispatch(confirmPayment({ id })).unwrap();
    },
    {
      onSuccess: (data) => {
        console.log("Payment successful!", data);
      },
      onError: (error: any) => {
        console.error(
          "Payment failed:",
          error?.response?.data?.message || "Error"
        );
      },
    }
  );
};
