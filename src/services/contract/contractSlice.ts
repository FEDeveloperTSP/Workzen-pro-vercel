import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "@/services/axiosService";
import { apiRoutes } from "../apiRoutes";
import { Contract, Payroll, Report } from "./type";
import axiosFile from "../axiosFileService";


interface DocumentState {
    loading: boolean;
    error: string | null;
    allcontractsdata: Contract[]
    // workerdata: WorkerData,
    // singleworkerdata: SingleWorker
    //   getAllBranchData: BranchTableData;
    //   datasingleBranch: SingleBranchData
}
const initialState: DocumentState = {
    loading: false,
    error: null,
    allcontractsdata: []
}


export const getAllContracts = createAsyncThunk(
    "getAllDocuments",
    async ({ worker_id, manager_id }: { worker_id?: string; manager_id?: string }, { rejectWithValue }) => {
        try {
            // Prepare request body
            const requestBody: Record<string, string | undefined> = {};
            if (worker_id) requestBody.worker_id = worker_id;
            if (manager_id) requestBody.manager_id = manager_id;

            const response = await axios.post(apiRoutes.contract.getall, requestBody);
            console.log("Success", response.data.data);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Fetching Contracts failed"
            );
        }
    }
);

export const uploadCon = createAsyncThunk(
    "uploadDoc",
    async ({ id, data }: { id: number, data: FormData }, { rejectWithValue }) => {
        try {
            const response = await axiosFile.post(apiRoutes.contract.upload(id), data);
            console.log("Success", response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Branch creation failed")
        }
    }
)
export const generateReport = createAsyncThunk(
    "generateReport",
    async (data: Report, { rejectWithValue }) => {
        try {
            const response = await axios.post(apiRoutes.report.generate, data, {
                responseType: 'blob'
              });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Branch creation failed")
        }
    }
)
export const generatePayroll = createAsyncThunk(
    "generatePayroll",
    async (data: Payroll, { rejectWithValue }) => {
        try {
            const response = await axios.post(apiRoutes.payroll.generate, data, {
                responseType: 'blob'
              });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Branch creation failed")

        }
    }
)
const contractSlice = createSlice({
    name: "document",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllContracts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllContracts.fulfilled, (state, action: PayloadAction<Contract[]>) => {
                state.loading = false;
                state.error = null;
                state.allcontractsdata = action.payload;
            })
            .addCase(getAllContracts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default contractSlice.reducer; // docu