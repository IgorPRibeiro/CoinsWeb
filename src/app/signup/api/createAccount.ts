import { ICreateAccountParams, ICreateAccountResponse } from "@/@types/user";
import api from "@/service";

export default async function createAccount(params: ICreateAccountParams) {
  const { data } = await api.post<ICreateAccountResponse>(
    "/users/cadastro",
    params
  );
  return data;
}
