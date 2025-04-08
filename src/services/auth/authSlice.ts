import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "@/services/axiosService";
import { apiRoutes } from "../apiRoutes";
import { Profile, Register } from "./AuthService";
import { User } from "@/lib/definitions";
import axiosFile from "../axiosFileService";

// Define the initial state
const initialState: {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  profiledata: Profile
} = {
  user: null,
  token: Cookies.get("access_token") || null,
  loading: false,
  error: null as string | null,
  profiledata: {
    name: "",
    email: "",
    phone_number: "",
    address: "",
    logo: "",
    company_name: "",
    role: "",
    postal_code: "",
  }
};
export const profileData = createAsyncThunk(
  "profiledata",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(apiRoutes.auth.getUserData);
      console.log("Success", response.data.data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Unable to get user data");
    }
  }
)
export const updatePassword = createAsyncThunk(
  "updatePassword",
  async (data: { old_password: string, password: string, password_confirmation: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiRoutes.auth.updatePassword, data);
      console.log("Success", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Password Update failed");
    }
  }
)
export const updateProfile = createAsyncThunk(
  "updateProfile",
  async (data: FormData, { rejectWithValue }) => {
    try {
      const response = await axiosFile.post(apiRoutes.auth.update, data);
      console.log("Success", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Profile Update failed");
    }
  }
)
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
      localStorage.setItem("role", response.data.data.role);
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
      console.log("jhdjkwldkw");
      const response = await axios.post(apiRoutes.auth.register, data);
      Cookies.set("cache_key", response.data.cache_key, {
        expires: 1 / 96, // 15 minutes = 1/96 of a day
        path: "/",
      });
      console.log("Success", response.data.cache_key);
      return response.data;
    } catch (error: any) {
      console.log(error);
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
      const Cache_key = Cookies.get("cache_key");
      const response = await axios.post(apiRoutes.auth.email, {
        otp,
        email,
        cache_key: Cache_key,
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Otp confirmation failed"
      );
    }
  }
);

export const confirmPayment = createAsyncThunk(
  "auth/confirmPayment",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const Cache_key = Cookies.get("cache_key");

      const response = await axios.post(apiRoutes.auth.payment, {
        payment_method_id: id,
        cache_key: Cache_key,
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
      Cookies.remove("role");
      Cookies.remove("__stripe_mid");
      localStorage.removeItem('role');
    },
    setUser: (state, action) => {
      state.user = action.payload; // Correctly extract payload
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
      })
      .addCase(profileData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        profileData.fulfilled,
        (state, action: PayloadAction<Profile>) => {
          state.loading = false;
          state.profiledata = action.payload;
        }
      )
      .addCase(profileData.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
