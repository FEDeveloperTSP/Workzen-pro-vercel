import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useMutation, useQuery } from "react-query";
import { apiRoutes } from "../apiRoutes";
import axios from "../axiosService";
import { createBranch, getAllBranches, TypeCreateBranch } from "./branchSlice";
import { AppDispatch } from "../store";
import toast from "react-hot-toast";
import { BranchTableData } from "./type";

export const useCreateBranchMutation = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useMutation(
    async (data: TypeCreateBranch) => {
      // Wait for the API response before proceeding
      return await dispatch(createBranch(data)).unwrap();
    },
    {
      onSuccess: (data) => {
        toast.success("Branches created successfully!");
      },
      onError: (error: any) => {
        console.log(error);
        toast.error(error || "Error Creating Branch");
      },
    }
  );
};
// export const useBranches = () => {
//   // const dispatch = useDispatch<AppDispatch>();
//   return useQuery({
//     queryKey: ["branches"],
//     queryFn: getAllBranches,
//     refetchOnMount: true,
//     refetchOnWindowFocus: true,
//     cacheTime: 0,
//   });
// };
export const useGetBranchesMutation = () => {
  const dispatch = useDispatch<AppDispatch>();

  return useMutation(
    async () => {
      // Wait for the API response before proceeding
      return await dispatch(getAllBranches()).unwrap();
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
