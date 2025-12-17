import { z } from "zod";

const phoneDigitsValid = (value: string) => {
  const digits = value.replace(/\D/g, "");
  return digits.length === 0 || digits.length === 10 || digits.length === 11;
};

const cepRegex = /^\d{5}-?\d{3}$/;

export const formSchema = z.object({
  name: z
    .string({ required_error: "Este campo é obrigatório." })
    .trim()
    .min(1, "Este campo é obrigatório."),
  email: z
    .string({ required_error: "E-mail é obrigatório." })
    .trim()
    .min(1, "E-mail é obrigatório.")
    .email("Informe um e-mail válido."),
  password: z
    .string({ required_error: "Senha é obrigatória." })
    .min(6, "Mínimo de 6 caracteres."),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((val) => phoneDigitsValid(val ?? ""), {
      message: "Informe um telefone válido.",
    }),
  cep: z
    .string({ required_error: "CEP é obrigatório." })
    .trim()
    .regex(cepRegex, "Informe um CEP válido."),
  street: z
    .string({ required_error: "Logradouro é obrigatório." })
    .trim()
    .min(1, "Logradouro é obrigatório."),
  number: z
    .string({ required_error: "Número é obrigatório." })
    .trim()
    .min(1, "Número é obrigatório."),
  complement: z.string().trim().optional().or(z.literal("")),
  neighborhood: z
    .string({ required_error: "Bairro é obrigatório." })
    .trim()
    .min(1, "Bairro é obrigatório."),
  city: z
    .string({ required_error: "Cidade é obrigatória." })
    .trim()
    .min(1, "Cidade é obrigatória."),
  state: z
    .string({ required_error: "UF é obrigatória." })
    .trim()
    .min(1, "UF é obrigatória.")
    .regex(/^[A-Za-z]{2}$/, "Use 2 letras, ex: SP."),
});

export type FormSchema = z.infer<typeof formSchema>;
