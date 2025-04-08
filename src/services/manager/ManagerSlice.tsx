import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "@/services/axiosService";
import { apiRoutes } from "../apiRoutes";
import { AssignShifts, CreateManager, ManagerData } from "./Type";
import axiosFile from "../axiosFileService";
import { SingleManagerData } from "../branch/type";
interface WorkerState {
    loading: boolean;
    error: string | null;
    managerdata: ManagerData,
    createmanager: CreateManager,
    singlemanager: SingleManagerData,
    //   getAllBranchData: BranchTableData;
    //   datasingleBranch: SingleBranchData
}
const initialState: WorkerState = {
    loading: false,
    error: null,
    managerdata: {
        total_managers: 0,
        active_managers: 0,
        inactive_managers: 0,
        total_wages: 0,
        managers_data: [],
    },
    createmanager: {
        logo: null,
        name: "",
        email: "",
        uniqueId: "",
        status: "",
        phone_number: "",
        wage: "",
        address: '',
        contract: null,
        branch_ids: [0]
    },
    singlemanager: {
        id: 0,
        name: "",
        email: "",
        uniqueId: "",
        status: "",
        address: "",
        phone_number: "",
        wage: "",
        branches: [],
        workers_count: 0,
        logo: null,
        contract_data:[]
        //     id: 0,
        //     name: "",
        //     contract: "",
        //     created_at: "",
        //     file_size: "",
        //     file_data: "",
        // []
    }
}
export const createManager = createAsyncThunk(
    "createManager",
    async (data: FormData, { rejectWithValue }) => {
        try {
            const response = await axiosFile.post(apiRoutes.managers.create, data)
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Fetching branches failed"
            );
        }
    }
)
export const updateManager = createAsyncThunk(
    "updateManager",
    async ({ id, data }: { id: number, data: FormData }, { rejectWithValue }) => {
        try {
            const response = await axiosFile.post(apiRoutes.managers.update(id), data)
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Fetching branches failed"
            );
        }
    }
)
export const getAllmanagers = createAsyncThunk(
    "getAllmanagers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(apiRoutes.managers.getall);
            console.log("Success", response.data.data);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Fetching branches failed"
            );
        }
    }
)
export const getSinglemanager = createAsyncThunk(
    "getSinglemanagers",
    async (id: number, { rejectWithValue }) => {
        try {
            const response = await axios.get(apiRoutes.managers.single(id));
            console.log("Success", response.data.data);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Fetching branches failed"
            );
        }
    }
)
export const assignShifts = createAsyncThunk(
    "assignShifts",
    async (data: AssignShifts, { rejectWithValue }) => {
        try {
            const response = await axios.post(apiRoutes.managers.assignshifts, data)
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Fetching branches failed"
            );
        }

    }
)

const managerSlice = createSlice({
    name: "manager",
    initialState,
    reducers: {
        resetBranchState: (state) => {
            state.managerdata = {
                total_managers: 0,
                active_managers: 0,
                inactive_managers: 0,
                total_wages: 0,
                managers_data: [],
            };
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllmanagers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getAllmanagers.fulfilled,
                (state, action: PayloadAction<ManagerData>) => {
                    state.loading = false;
                    state.managerdata = action.payload;
                }
            )
            .addCase(getAllmanagers.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getSinglemanager.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getSinglemanager.fulfilled,
                (state, action: PayloadAction<SingleManagerData>) => {
                    state.loading = false;
                    state.singlemanager = action.payload;
                }
            )
            .addCase(getSinglemanager.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});

export const { resetBranchState } = managerSlice.actions;
export default managerSlice.reducer;
