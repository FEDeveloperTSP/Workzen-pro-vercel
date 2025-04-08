import { useQuery } from "react-query";
import { getDashboardData } from "./dashboard";

export const useGetDashboardData = () => {
  return useQuery({
    queryKey: ['get-dashboard-data'],
    queryFn: getDashboardData,
    staleTime: 1000 * 30,
    retry: 3,
    onError: (error) => {
        console.error('get-dashboard-data query error:', error);
    },
  });
}