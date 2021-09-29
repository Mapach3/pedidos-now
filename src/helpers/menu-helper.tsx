export const getMenu = () => {
  const notLoggedMenu = [
    {
      text: "Login",
      url: "/login",
    },
    {
      text: "Registrarse",
      url: "/register",
    },
  ];

  const loggedInMenu = [
    {
      text: "Perfil",
      url: "/profile",
    },
  ];

  const comercianteMenu = [
    {
      text: "Perfil",
      url: "/profile",
    },
    {
      text: "Cargar Restaurante",
      url: "/restaurantCreate",
    },
  ];

  if (typeof window !== "undefined") {
    const userTypeAux = localStorage.getItem("PedidosNow.UserType");

    return userTypeAux
      ? userTypeAux === "CLIENTE"
        ? loggedInMenu
        : userTypeAux === "COMERCIANTE"
            ? comercianteMenu
            : notLoggedMenu
      : notLoggedMenu;
  }

  return notLoggedMenu;
};
