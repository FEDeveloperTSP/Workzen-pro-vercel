export interface BranchTableData {
  total_branches: number;
  active_branches: number;
  inactive_branches: number;
  total_expenses: number;
  branches_data: BranchData[];
}

export interface BranchData {
  id?: number;
  name: string;
  location: string;
  status: string;
  workers_count: number;
  worker_sum_wages: number;
  managers: BranchManagerData[];
}

export interface BranchManagerData {
  id?: number;
  name: string;
  email: string;
  status: string;
}
