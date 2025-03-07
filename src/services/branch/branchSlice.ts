import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "@/services/axiosService";
import { apiRoutes } from "../apiRoutes";
import { BranchTableData } from "./type";

export interface TypeCreateBranch {
  name: string;
  location: string;
  status: string;
  code: string;
}

interface BranchState {
  user: any | null;
  loading: boolean;
  error: string | null;
  getAllBranchData: BranchTableData;
}

const initialState: BranchState = {
  user: null,
  loading: false,
  error: null,
  getAllBranchData: {
    total_branches: 0,
    active_branches: 0,
    inactive_branches: 0,
    total_expenses: 0,
    branches_data: [],
  },
};

// Async thunk for creating a branch
export const createBranch = createAsyncThunk(
  "branch/createBranch",
  async (data: TypeCreateBranch, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiRoutes.branch.create, data);
      console.log("Success", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Branch creation failed"
      );
    }
  }
);

// Async thunk for fetching all branches
export const getAllBranches = createAsyncThunk(
  "branch/getAllBranches",
  async (_, { rejectWithValue }) => {
    try {
      console.log("bkjj")
      const response = await axios.get(apiRoutes.branch.getall);
      console.log("Success", response.data.data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Fetching branches failed"
      );
    }
  }
);

const branchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {
    resetBranchState: (state) => {
      state.getAllBranchData = {
        total_branches: 0,
        active_branches: 0,
        inactive_branches: 0,

        total_expenses: 0,
        branches_data: [],
      };
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBranches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllBranches.fulfilled,
        (state, action: PayloadAction<BranchTableData>) => {
          state.loading = false;
          state.getAllBranchData = action.payload;
        }
      )
      .addCase(getAllBranches.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetBranchState } = branchSlice.actions;
export default branchSlice.reducer;
