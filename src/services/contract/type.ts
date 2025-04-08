export interface Contract {
    id?: number;
    name: string;
    doc_type?: string;
    file_data: string;
    created_at: string;
    contract_against?: string;
    type: string;
}
export interface Report {
    id?: number;
    report_type?: string;
    start_date?: string;
    end_date?: string;
}
export interface Payroll {
    id?: number,
    report_type?: string,
    manager_id?: number;
    worker_id?: number;
    start_date?: string;
    end_date?: string;
}