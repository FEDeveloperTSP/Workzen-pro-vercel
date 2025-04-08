type Worker = {
  id: number;
  name: string;
  status: string;
};

type Manager = {
  id: number;
  name: string;
};

type Branch = {
  id: number;
  name: string;
  workers_sum_wage: number;
  managers_sum_wage: number;
  workers_count: number;
  managers: Manager[];
  workers: Worker[];
  managers_count: number;
};

export type DashboardData = {
  total_branches: number;
  total_managers: number;
  total_workers: number;
  total_expenses: number;
  branch_wise_data: Branch[];
};

type TableData = {
  key: string;
  name: string;
  manager: string;
  attendanceRate: string;
};
