const Required = () => ({ required: "Este campo é obrigatório." });

const Email = () => ({
  required: "E-mail é obrigatório.",
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Informe um e-mail válido.",
  },
});

const Password = () => ({
  required: "Senha é obrigatória.",
  minLength: { value: 6, message: "Mínimo de 6 caracteres." },
});

const Phone = () => ({
  required: "Telefone é obrigatório.",
  pattern: {
    value: /^\(?\d{2}\)?[\s-]?9?\d{4}-?\d{4}$/,
    message: "Informe um telefone válido.",
  },
});

const Cep = () => ({
  required: "CEP é obrigatório.",
  pattern: {
    value: /^\d{5}-?\d{3}$/,
    message: "Informe um CEP válido.",
  },
});

export const Validators = {
  Required,
  Email,
  Password,
  Phone,
  Cep,
};
