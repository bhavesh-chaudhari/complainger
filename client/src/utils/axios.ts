import axios from "axios";
import { API_BASE_URL } from "./baseUrl";
import { getUserFromLocalStorage } from "./localStorage";
import { AxiosError } from "axios";
import { AxiosRequestConfig } from "axios";
import { AxiosResponse } from "axios";

const client = axios.create({ baseURL: API_BASE_URL });

export const request = ({ ...options }: AxiosRequestConfig) => {
  const user = getUserFromLocalStorage();

  client.defaults.headers.common.Authorization = `Bearer ${user?.token}`;

  const onSuccess = (response: AxiosResponse) => response;
  const onError = (error: AxiosError) => {
    return error.response;
  };

  return client(options).then(onSuccess).catch(onError);
};