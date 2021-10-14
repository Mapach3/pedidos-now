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
    {
      text: "Mis pedidos",
      url: "/orders",
    },
  ];

  const comercianteMenu = [
    {
      text: "Perfil",
      url: "/profile",
    },
    {
      text: "Pedidos",
      url: "/restaurants/orders/pendings",
    },
  ];

  const repartidorMenu = [
    {
      text: "Perfil",
      url: "/profile",
    },
    {
      text: "Pedidos",
      url: "/repartidor/orders/pendings",
    },
  ];



  if (typeof window !== "undefined") {
    const userTypeAux = localStorage.getItem("PedidosNow.UserType");

    return userTypeAux
      ? userTypeAux === "CLIENTE"
        ? loggedInMenu
        : userTypeAux === "COMERCIANTE"
            ? comercianteMenu
            : userTypeAux === "REPARTIDOR"
               ? repartidorMenu
               : notLoggedMenu
      : notLoggedMenu;
  }

  return notLoggedMenu;
};
