import { useMutation, useQuery } from "react-query";
import { getChangeShiftTime, getShifts, postChangeShiftTime } from "./shiftsAndAttendance";

export const useGetShifts = (date: string) => {
  return useQuery({
    queryKey: ['get-shifts', date],
    queryFn: () => getShifts(date),
    staleTime: 1000 * 30,
    retry: 3,
    onError: (error) => {
      console.error('get-shifts query error:', error);
    },
  });
}

export const useGetChangeShiftTime = () => {
  return useQuery({
    queryKey: ['get-change-shift-time'],
    queryFn: getChangeShiftTime,
    staleTime: 1000 * 30,
    retry: 3,
    onError: (error) => {
        console.error('get-change shift time query error:', error);
    },
  });
}

export const usePostChangeShiftTime = () => {
  return useMutation({
    mutationFn: postChangeShiftTime,
    onError: (error) => {
      console.error("post-change shift time mutation error:", error);
    },
  });
};