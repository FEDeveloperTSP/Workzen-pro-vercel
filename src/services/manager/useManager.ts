import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useMutation } from "react-query";
import { assignShifts, createManager, getAllmanagers, getSinglemanager, updateManager } from "./ManagerSlice";
import toast from "react-hot-toast";
import { AssignShifts, CreateManager } from "./Type";

export const useGetAllManagersMutation = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useMutation(
        async () => {
            // Wait for the API response before proceeding
            return await dispatch(getAllmanagers()).unwrap();
        },
        {
            onSuccess: () => {
                // toast.success("Branches created successfully!");
            },
            onError: (error: any) => {
                console.log(error);
                toast.error(error || "Error getting Managerss");
            },
        }
    );
};
export const useGetSingleManagersMutation = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useMutation(
        async (id: number) => {
            // Wait for the API response before proceeding
            return await dispatch(getSinglemanager(id)).unwrap();
        },
        {
            onSuccess: () => {
                // toast.success("Branches created successfully!");
            },
            onError: (error: any) => {
                console.log(error);
                toast.error(error || "Error getting Manager Data");
            },
        }
    );
};
export const useCreateManagerMutation = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useMutation(
        async (data: FormData) => {
            // Wait for the API response before proceeding
            return await dispatch(createManager(data)).unwrap();
        },
        {
            onSuccess: () => {
                toast.success("Manager created successfully!");
            },

            onError: (error: any) => {
                console.log(error);
                toast.error(error || "Error Creating Manager");
            },
        }
    );
};
export const useUpdateManagerMutation = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useMutation(
        async ({ id, data }: { id: number, data: FormData }) => {
            // Wait for the API response before proceeding
            return await dispatch(updateManager({ id, data })).unwrap();
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
export const useAssignShiftMutation = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useMutation(
        async (data: AssignShifts) => {
            return await dispatch(assignShifts(data)).unwrap();
        },
        {
            onSuccess: () => {
                toast.success("Shifts request send successfully!");
            },
            onError: (error: any) => {
                console.log(error);
                toast.error(error || "Error assigning Shifts!");
            },
        }
    )
}