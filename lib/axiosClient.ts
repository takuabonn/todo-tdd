import axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { getSession } from "next-auth/react";

export const axiosClient = axios.create({
  baseURL: "http://localhost:3000/api",
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * リクエスト インターセプター
 */
axiosClient.interceptors.request.use(async (config) => {
  if (config.headers !== undefined) {
    // --ヘッダにアクセストークンを埋める
    const session = await getSession();

    if (session) {
      config.headers.Authorization = `token ${session.access_token}`;
    }
  }
  return config;
});
