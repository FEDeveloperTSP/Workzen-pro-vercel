import { register } from "module";
import { number } from "yup";

export const apiRoutes = {
  auth: {
    login: "login",
    register: "register",
    email: "verify-email",
    payment: "/make-payment",
    getUserData: '/get-user-data',
    update:"/update-profile",
    updatePassword:"/update-password"
  },
  branch: {
    create: "/create-branch",
    getall: "/branch-table-data",
    single: (id: number) => `/branch-details/${id}`,
    update: (id: number) => `/update-branch/${id}`,
  },
  workers: {
    getall: "/worker-table-data",
    single: (id: number) => `/get-single-worker/${id}`,
    create:"create-worker",
    update: (id: number) => `/update-worker/${id}`,
  },
  managers: {
    getall: "/manager-table-data",
    create: '/create-manager',
    update: (id: number) => `/update-manager/${id}`,
    single: (id: number) => `/single-manager/${id}`,
    assignshifts: '/assign-shifts',
    getShifts: (date: string) => `/get-shifts?date=${date}`,
    getChangeShiftTime: '/change-shift-time',
    postChangeShiftTime: '/change-shift-time',
  },
  document: {
    upload: "/upload-contract",
    getall: "/get-documents",
  },
  contract: {
    getall: "/get-contracts",
    upload: (id: number) => `/upload-contract/${id}`
  },
  report:{
    generate:'/generate-report',
  },
  payroll:{
    generate:'/generate-report',
  },
  dashboard: {
    get: '/company-dashboard'
  }
};
