export interface User {
  id: number;
  company_id: number | null;
  stripe_id: string | null;
  name: string;
  email: string;
  email_verified_at: string | null;
  role: "company" | "manager" | "worker";
  company_name: string | null;
  phone_number: string;
  address: string;
  postal_code: string;
  email_verify_otp: string | null;
  password_verify_otp: string | null;
  logo: string;
  wage: number | null;
  created_at: string;
  updated_at: string;
  company_logo:string;
}