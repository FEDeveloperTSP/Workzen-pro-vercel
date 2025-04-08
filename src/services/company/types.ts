export interface Shift {
    id: number;
    user_id: number;
    manager_id: number;
    worker_id: number | null;
    unique_shift_id: string;
    date: string;
    start_time: string;
    end_time: string;
    status: string;
    shift_provided_by: number;
    end_of_week: string | null;
    created_at: string;
    updated_at: string;
    attendance_report: {
        status: 'present' | 'absent' | 'late' | null;
    } | null;
    presence_status: 'present' | 'absent' | 'late'
}