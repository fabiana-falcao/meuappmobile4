export function mensagemErroAuth(code) {
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return "E-mail ou senha incorretos.";
    case "auth/user-not-found":
      return "Usuário não encontrado.";
    case "auth/invalid-email":
      return "E-mail inválido.";
    case "auth/email-already-in-use":
      return "Este e-mail já está cadastrado.";
    case "auth/weak-password":
      return "A senha deve ter pelo menos 6 caracteres.";
    case "auth/network-request-failed":
      return "Sem conexão. Verifique sua internet.";
    default:
      return "Ocorreu um erro. Tente novamente.";
  }
}
