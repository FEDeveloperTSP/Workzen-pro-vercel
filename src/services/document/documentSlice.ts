import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "@/services/axiosService";
import { apiRoutes } from "../apiRoutes";
import { AllDocuments } from "./type";
import axiosFile from "../axiosFileService";


interface DocumentState {
    loading: boolean;
    error: string | null;
    alldocumentsdata: AllDocuments[]
    // workerdata: WorkerData,
    // singleworkerdata: SingleWorker
    //   getAllBranchData: BranchTableData;
    //   datasingleBranch: SingleBranchData
}
const initialState: DocumentState = {
    loading: false,
    error: null,
    alldocumentsdata: []
}


export const getAllDocuments = createAsyncThunk(
    "getAllDocuments",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(apiRoutes.document.getall);
            console.log("Success", response.data.data);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Fetching branches failed"
            )
        }
    }
)
export const uploadDoc = createAsyncThunk(
    "uploadDoc",
    async (data: FormData, { rejectWithValue }) => {
        try {
            const response = await axiosFile.post(apiRoutes.document.upload, data);
            console.log("Success", response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Branch creation failed")
        }
    }
)


const documentSlice = createSlice({
    name: "document",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllDocuments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllDocuments.fulfilled, (state, action: PayloadAction<AllDocuments[]>) => {
                state.loading = false;
                state.error = null;
                state.alldocumentsdata = action.payload;
            })
            .addCase(getAllDocuments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default documentSlice.reducer; // docu