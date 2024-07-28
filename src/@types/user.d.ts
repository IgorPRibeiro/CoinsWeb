export interface ICreateAccountParams {
  email: string;
  name: string;
  password: string;
}

export interface ICreateAccountResponse {
  mensagem: string;
  usuarioCriado: UsuarioCriado;
}

export interface UsuarioCriado {
  id_usuarios: number;
  email: string;
}

export interface ILoginResponse {
  mensage: string;
  token: string;
}

export interface IUserResponse {
  id: number;
  email: string;
  name: string;
}
