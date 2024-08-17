import { useEffect } from "react";
import { useRetrieveUserQuery } from "../redux/features/authApiSlice";
import { useAppDispatch } from "../redux/hooks";
import { UserProps } from "../types/types";
import { setIsLoading, setUser } from "../redux/features/userSlice";

export default function useSetUser() {
  const dispatch = useAppDispatch();

  const { data, isSuccess, isLoading } = useRetrieveUserQuery();

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data as UserProps));
      dispatch(setIsLoading(isLoading));
    }
  }, [data, isSuccess, dispatch, isLoading]);
}
