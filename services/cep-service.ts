import { api } from "./api";

export type CepResponse = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean;
};

async function getByCep(cep: string) {
  const { data } = await api.get<CepResponse>(`${cep}/json/`);
  return data;
}

export const CepService = {
  getByCep,
};
