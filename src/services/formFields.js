export const FORM_FIELDS = {
  nome: {
    id: "nome",
    label: "Nome completo:",
    type: "text",
    placeholder: "Digite seu nome completo",
  },
  matricula: {
    id: "matricula",
    label: "Matrícula:",
    type: "text",
    placeholder: "Digite seu número de matrícula",
    mask: "0000000",
  },
  email: {
    id: "email",
    label: "E-mail:",
    type: "email",
    placeholder: "Digite seu e-mail",
  },
  telefone: {
    id: "telefone",
    label: "Telefone:",
    type: "tel",
    placeholder: "Digite seu número de telefone",
    mask: "+00 (00) 00000-0000",
  },
  senha: {
    id: "senha",
    label: "Senha:",
    type: "password",
    placeholder: "Digite sua senha (mínimo 6 caracteres)",
  },
};
