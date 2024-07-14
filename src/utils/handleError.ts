import { SerializedError } from "@reduxjs/toolkit";

export const handleError = (error: SerializedError, message: string) => {
  if (error.name === "ResponseError") {
    throw new Error(message);
  }
  throw new Error(error.message);
}
