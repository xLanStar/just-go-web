import axios from "axios";
import { useEffect, useState } from "react";

const useVerifyEmail = (token: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    verifyEmail(token);
  }, []);

  const verifyEmail = async (token: string) => {
    try {
      const response = await axios.get(`/api/auth/verify/${token}`);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return { loading, error };
};

export default useVerifyEmail;
