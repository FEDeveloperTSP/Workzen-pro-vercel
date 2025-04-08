import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useMutation } from "react-query";
import { CreateWorker, getAllworkers, getSingleWorker, UpdateWorker } from "./workerSlice";
import toast from "react-hot-toast";

export const useGetAllWorkersMutation = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useMutation(
        async () => {
            // Wait for the API response before proceeding
            return await dispatch(getAllworkers()).unwrap();
        },
        {
            onSuccess: () => {
                // toast.success("Branches created successfully!");
            },
            onError: (error: any) => {
                console.log(error);
                toast.error(error || "Error getting Branch");
            },
        }
    );
};
export const useGetSingleWorkersMutation = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useMutation(
        async (id: number) => {
            // Wait for the API response before proceeding
            return await dispatch(getSingleWorker(id)).unwrap();
        },
        {
            onSuccess: () => {
                // toast.success("Branches created successfully!");
            },
            onError: (error: any) => {
                console.log(error);
                toast.error(error || "Error getting Branch");
            },
        }
    );
};
export const useCreateWorkerMutation = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useMutation(
        async (data: FormData) => {
            // Wait for the API response before proceeding
            return await dispatch(CreateWorker(data)).unwrap();
        },
        {
            onSuccess: () => {
                toast.success("Worker created successfully!");
            },

            onError: (error: any) => {
                console.log(error);
                toast.error(error || "Error Creating worker");
            },
        }
    );
};
export const useUpdateWorkerMutation = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useMutation(
        async ({ id, data }: { id: number, data: FormData }) => {
            // Wait for the API response before proceeding
            return await dispatch(UpdateWorker({ id, data })).unwrap();
        },
        {
            onSuccess: () => {
                toast.success("Manager updated successfully!");
            },
            onError: (error: any) => {
                console.log(error);
                toast.error(error || "Error updating Manager!");
            },
        }
    );
};