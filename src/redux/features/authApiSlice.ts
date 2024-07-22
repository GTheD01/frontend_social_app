import {
  RegisterUserProps,
  RegisterUserResponseProps,
} from "../../types/types";

import { apiSlice } from "../services/apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegisterUserResponseProps, RegisterUserProps>({
      query: ({ first_name, last_name, email, password, re_password }) => ({
        url: "/users/",
        method: "POST",
        body: { first_name, last_name, email, password, re_password },
      }),
    }),
  }),
});

export const { useRegisterMutation } = authApiSlice;
