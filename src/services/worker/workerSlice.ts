import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "@/services/axiosService";
import { apiRoutes } from "../apiRoutes";
import { SingleWorker, WorkerData } from "./type";
import axiosFile from "../axiosFileService";
interface WorkerState {
    loading: boolean;
    error: string | null;
    workerdata: WorkerData,
    singleworkerdata: SingleWorker,
    //   getAllBranchData: BranchTableData;
    //   datasingleBranch: SingleBranchData
}
const initialState: WorkerState = {
    loading: false,
    error: null,
    workerdata: {
        total_workers: 0,
        active_workers: 0,
        inactive_workers: 0,
        total_expenses: 0,
        workers_data: [],
    },
    singleworkerdata: {
        status:"",
        id: 0,
        name: "",
        logo: "",
        email: "",
        branch: "",
        phone_number: "",
        address: "",
        wage: '',
        branch_id: 0,
        branches: {
            id: 0,
             name: "",
             location: "",
             status: "",
             code: "",
             workers_count: 0,
             managers_count: 0,
             workers_sum_wage: 0,
             managers: [],
             workers: []
        },
        contract_data:[],
        //     id: 0,
        //     name: "",
        //     contract: "",
        //     created_at: "",
        //     file_size: "",
        //     file_data: "",
        // }
    }
}
export const CreateWorker = createAsyncThunk(
    "createWorker",
    async (data: FormData, { rejectWithValue }) => {
        try {
            const response = await axiosFile.post(apiRoutes.workers.create, data)
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Fetching branches failed"
            );
        }
    }
)
export const UpdateWorker=createAsyncThunk(
    "updateWorker",
    async ({id,data}: {id:number,data:FormData}, { rejectWithValue }) => {
        try {
            const response = await axiosFile.post(apiRoutes.workers.update(id), data)
            return response.data.data;
        } catch (error: any) {  
            return rejectWithValue(
                error.response?.data?.message || "Fetching branches failed"
            );
        }
    }
)
export const getAllworkers = createAsyncThunk(
    "getAllworkers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(apiRoutes.workers.getall);
            console.log("Success", response.data.data);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Fetching branches failed"
            );
        }
    }
)

export const getSingleWorker =
    createAsyncThunk(
        "getSingleworkers",
        async (id: number, { rejectWithValue }) => {
            try {
                const response = await axios.get(apiRoutes.workers.single(id));
                console.log("Success", response.data.data);
                return response.data.data;
            } catch (error: any) {
                return rejectWithValue(
                    error.response?.data?.message || "Fetching branches failed"
                );
            }
        }
    )
const workerSlice = createSlice({
    name: "worker",
    initialState,
    reducers: {
        resetBranchState: (state) => {
            state.workerdata = {
                total_workers: 0,
                active_workers: 0,
                inactive_workers: 0,
                total_expenses: 0,
                workers_data: [],
            };
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllworkers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getAllworkers.fulfilled,
                (state, action: PayloadAction<WorkerData>) => {
                    state.loading = false;
                    state.workerdata = action.payload;
                }
            )
            .addCase(getAllworkers.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getSingleWorker.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getSingleWorker.fulfilled,
                (state, action: PayloadAction<SingleWorker>) => {
                    state.loading = false;
                    state.singleworkerdata = action.payload;
                }
            )
            .addCase(getSingleWorker.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});

export const { resetBranchState } = workerSlice.actions;
export default workerSlice.reducer;
