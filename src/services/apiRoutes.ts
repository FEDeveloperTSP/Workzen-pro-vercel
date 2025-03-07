import { register } from "module";

export const apiRoutes = {
  auth: {
    login: "/api/login",
    register: "/api/register",
    email: "/api/verify-email",
    payment: "/api/make-payment",
  },
  branch: {
    create: "/api/create-branch",
    getall: "/api/branch-table-data",
  },
};
