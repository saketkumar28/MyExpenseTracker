// import { downloadIncomeExcel } from "../../../backend/controllers/incomeController";

export const BASE_URL = 'http://localhost:8000/api/v1';

export const API_PATH = {
    AUTH: {
      LOGIN : "/auth/login",
      REGISTER: "/auth/register",
      GET_USER_INFO: "/auth/getUserInfo", // Updated to match backend route
    },
    DASHBOARD: {
      GET_DASHBOARD_DATA: "/dashboard",
    },
    INCOME : {
      ADD_INCOME: "/income/add",
      GET_ALL_INCOME: "/income/getAll",
      DELETE_INCOME: (incomeId) => `/income/${incomeId}`,
      DOWNLOAD: "/income/download-excel", // ✅ use the imported function
    },
    EXPENSE: {
      ADD_EXPENSE: "/expense/add",
      GET_ALL_EXPENSE: "/expense/getAll",
      DELETE_EXPENSE: (expenseId) => `/expense/${expenseId}`,
      DOWNLOAD: `/expense/download-excel`,
    },
    IMAGE : {
      UPLOAD_IMAGE: "/auth/upload-image"
    },
    
  }
