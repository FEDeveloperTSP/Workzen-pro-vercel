import { apiRoutes } from "@/services/apiRoutes"
import axios from "@/services/axiosService"

export const getDashboardData = async () => {
  const { data } = await axios.get(apiRoutes.dashboard.get)
  return data
}
