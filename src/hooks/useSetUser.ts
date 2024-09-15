import { useEffect } from "react";

import { useRetrieveUserQuery } from "../redux/features/authApiSlice";
import { UserProps } from "../types/types";
import { setIsLoading, setUser } from "../redux/features/userSlice";
import { useAppDispatch } from "../redux/hooks";

export default function useSetUser() {
  const dispatch = useAppDispatch();

  const { data, isSuccess } = useRetrieveUserQuery(undefined, {});

  useEffect(() => {
    if (isSuccess) {
      dispatch(setIsLoading(true));
      dispatch(setUser(data as UserProps));
      dispatch(setIsLoading(false));
    }
  }, [data, isSuccess, dispatch]);
}
