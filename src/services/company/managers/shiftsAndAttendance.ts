import { apiRoutes } from "@/services/apiRoutes"
import axios from "@/services/axiosService"

export const getShifts = async (date: string) => {
  const { data } = await axios.get(apiRoutes.managers.getShifts(date))
  return data
}

export const getChangeShiftTime = async () => {
  const { data } = await axios.get(apiRoutes.managers.getChangeShiftTime)
  return data
}

export const postChangeShiftTime = async (payload: any) => {
  const { data } = await axios.post(apiRoutes.managers.postChangeShiftTime, payload);
  return data;
};