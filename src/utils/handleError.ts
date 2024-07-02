import { AxiosError } from "axios";

export const handleError = (error: unknown, message: string) => {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    switch (status) {
      case 404:
        throw new Error(message);
      case 500:
        throw new Error("系統發生錯誤，請稍後再試");
    }
  } else {
    console.error(error);
    throw new Error("系統發生錯誤，請稍後再試");
  }
};
