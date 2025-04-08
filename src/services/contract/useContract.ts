import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useMutation } from "react-query";
import { generatePayroll, generateReport, getAllContracts, uploadCon } from "./contractSlice"
import toast from "react-hot-toast";
import { Report } from "./type";
import axios from "../axiosService";
import { apiRoutes } from "../apiRoutes";

export const useGetAllContractsMutation = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useMutation(
        async ({ worker_id, manager_id }: { worker_id?: string; manager_id?: string }) => {
            // Wait for the API response before proceeding
            return await dispatch(getAllContracts({ worker_id, manager_id })).unwrap();
        },
        {
            onSuccess: () => {
                // toast.success("Branches created successfully!");
            },
            onError: (error: any) => {
                console.log(error);
                toast.error(error || "Error getting Documents");
            },
        }
    );
};

export const useUploadContractsMutation = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useMutation(
        async ({ id, data }: { id: number, data: FormData }) => {
            // Wait for the API response before proceeding
            return await dispatch(uploadCon({ id, data })).unwrap();
        },
        {
            onSuccess: () => {
                toast.success("Contract Uploaded successfully!");
            },
            onError: (error: any) => {
                console.log(error);
                toast.error(error || "Error uploading documents");
            },
        }
    );
};
export const useGenerateReportMutation = () => {
    return useMutation({
        mutationFn: async (data: Report) => {
            const response = await axios.post(apiRoutes.report.generate, data, {
                responseType: 'blob',
            });
            return response.data; // this is a Blob
        },
    });
};
export const useGeneratePayrollMutation = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useMutation(
        async (data: Report) => {
            // Wait for the API response before proceeding
            return await dispatch(generatePayroll(data)).unwrap();
        },
        {
            onSuccess: () => {
                
            },
            onError: (error: any) => {
                toast.error(error || "Error generating report");
            },
        }
    );
};