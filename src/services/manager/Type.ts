import { BranchData } from "../branch/type";

export interface ManagerData {
    total_managers: number;
    active_managers: number;
    inactive_managers: number;
    total_wages: number;
    managers_data: ManagerTable[]
}
export interface ManagerTable {
    id: number;
    name: string;
    email: string;
    status: string;
    wage: string;
    availability:string,
    logo: string;
    branches: BranchData[];
    workers_count: number;
}
export interface CreateManager {
    logo: File | null,
    name: string,
    uniqueId: string,
    email: string,
    status: string,
    phone_number: string,
    branch_ids: number[],
    address: string,
    contract: File | null,
    wage: string,
}

export interface AssignShifts {
    id?: number;
    start_time?: string;
    end_time?: string;
}
