export const handleRequestError = (error: any) => {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        console.log(
          "warn",
          "Solicitud Incorrecta",
          "Por favor revisa los datos enviados."
        );
        break;
      case 401:
        console.log("warn", "No Autorizado", "Debes iniciar sesión.");
        localStorage.removeItem("token");
        window.location.href = "/login"; // Redirigir a login si el token es inválido
        break;
      case 500:
        console.log(
          "error",
          "Error del Servidor",
          "Ocurrió un problema interno. Inténtalo más tarde."
        );
        break;
      default:
        console.log("error", "Error", "Ocurrió un error inesperado.");
    }
  } else {
    console.log(
      "error",
      "Error de Conexión",
      "Verifica tu conexión a internet."
    );
  }
};
