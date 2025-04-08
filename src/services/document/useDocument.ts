import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { useMutation } from "react-query";
import { getAllDocuments, uploadDoc } from "./documentSlice";
import toast from "react-hot-toast";

export const useGetAllDocumentsMutation = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useMutation(
        async () => {
            // Wait for the API response before proceeding
            return await dispatch(getAllDocuments()).unwrap();
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
export const useUploadDocumentsMutation = () => {
    const dispatch = useDispatch<AppDispatch>();

    return useMutation(
        async (data: FormData) => {
            // Wait for the API response before proceeding
            return await dispatch(uploadDoc(data)).unwrap();
        },
        {
            onSuccess: () => {
                toast.success("Documents uploaded successfully!");
            },
            onError: (error: any) => {
                console.log(error);
                toast.error(error || "Error uploading documents");
            },
        }
    );
};