import { BranchData, BranchWorkerData, Contract_data } from "../branch/type";

export interface WorkerData {
    total_workers: number,
    active_workers: number,
    inactive_workers: number,
    total_expenses: number,
    workers_data: workerTable[]
}
export interface workerTable {
    id: number,
    name: string,
    availibility: string,
    email: string,
    status: string,
    wage: string,
    managers: BranchWorkerData,
    branches: BranchData,
    phone_number: string,
    logo: string,

    branch: string
}
export interface SingleWorker {
    id?: number;
    name: string;
    email: string;
    logo: string | null | File;
    address: string;
    wage: string;
    branches: BranchData;
    branch_id: number;
    branch:string,
    phone_number: string;
    status: string;
    contract_data: Contract_data[]
}


export interface CreateWorker {
    name: string;
    logo: File | null;
    email: string;
    status: string;
    phone_number: string;
    branch_ids: number[];
    address: string;
    contract: string | null;
    wage: string;
}
