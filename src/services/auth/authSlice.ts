import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "@/services/axiosService";
import { apiRoutes } from "../apiRoutes";
import { Register } from "./AuthService";

// Define the initial state
const initialState = {
  user: null,
  token: Cookies.get("access_token") || null,
  loading: false,
  error: null as string | null,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(apiRoutes.auth.login, {
        email,
        password,
      });
      console.log("Success", response.data.data.token);
      Cookies.set("role", response.data.data.role);
      Cookies.set("access_token", response.data.data.token, {
        expires: 7,
        path: "/",
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);
export const RegisterUser = createAsyncThunk(
  "auth/RegisterUser",
  async (data: Register, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiRoutes.auth.register, data, {
        withCredentials: true, // ✅ Correct way to include cookies
      });
      console.log("Success", response.data.data.token);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);
export const confirmOTP = createAsyncThunk(
  "auth/confirmOTP",
  async (
    { otp, email }: { otp: number; email: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        apiRoutes.auth.email,
        { otp, email },
        { withCredentials: true } // ✅ Correct way to include cookies
      );
      console.log("Success", response.data.data.token);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const confirmPayment = createAsyncThunk(
  "auth/confirmPayment",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiRoutes.auth.email, {
        payment_method_id: id,
      });

      console.log("Success", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Payment confirmation failed"
      );
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove("access_token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Explicitly cast as string
      })
      .addCase(RegisterUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(RegisterUser.fulfilled, (state, action) => {
        state.loading = false;
        // state.user = action.payload.user;
        // state.token = action.payload.token;
      })
      .addCase(RegisterUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Explicitly cast as string
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
