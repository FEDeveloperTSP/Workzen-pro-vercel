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
  code: string;
  workers_count: number;
  managers_count: number;
  workers_sum_wage: number;
  managers: BranchManagerData[];
  workers: BranchWorkerData[];
  // branches:
}

export interface BranchManagerData {
  id?: number;
  name: string;
  email: string;
  status: string;
  logo: string;
}
export interface BranchWorkerData {
  id?: number;
  name: string;
  email: string;
  status: string;
  logo: string;
}
export interface SingleBranchData {
  id?: number;
  branch_name: string;
  total_managers: number,
  total_workers: number,
  total_expenses: number,
  branch_details: BranchData[];
}
export interface SingleManagerData {
  id?: number;
  name: string;
  email: string;
  status: string;
  address: string;
  phone_number: string;
  wage: string;
  branches: BranchData[];
  workers_count: number
  logo: string | null | File,
  uniqueId: string,
  contract_data: Contract_data[],
}
export interface Contract_data {
  id?: number;
  name: string;
  contract: File|string;
  created_at: string;
  file_size?: string;
  file_data?: string
}
