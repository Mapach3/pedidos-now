import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoggedInRoute from "../components/LoggedInRoute/LoggedInRoute";
import NotFoundPage from "../components/NotFound/NotFoundPage";
import { ClientRoutes } from "../config/enums";
import HomePage from "../pages/HomePage";
import HomePageComerciante from "../pages/HomePageComerciante";
import HomePageRepartidor from "../pages/HomePageRepartidor";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import ProfilePage from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";
import RestaurantsCreatePage from "../pages/RestaurantCreatePage";
import RestaurantMenuPage from "../pages/RestaurantMenuPage";
import RestaurantOrders from "../pages/RestaurantOrders";
import ClientOrders from "../pages/ClientOrdersPage";
import RepartidorOrders from "../pages/RepartidorOrders";
import RestaurantsPage from "../pages/RestaurantsPage";
import WizardPage from "../pages/WizardPage";
import ProductCreatePage from "../pages/ProductCreatePage";
import RestaurantsModifiedPage from "../pages/RestaurantModifiedPage";
import RestaurantsModifiedPageSelector from "../pages/RestaurantModifiedPageSelector";
import RestaurantsDeletePage from "../pages/RestaurantDeletePage";


const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/*Public routes not requiring Login*/}
        <Route exact path={ClientRoutes.HOME}>
          <HomePage />
        </Route>

        <Route exact path={ClientRoutes.LOGIN}>
          <Login />
        </Route>

        <Route exact path={ClientRoutes.LOGOUT}>
          <Logout />
        </Route>

        <Route exact path={ClientRoutes.RESTAURANTS}>
          <RestaurantsPage />
        </Route>

        <Route exact path={ClientRoutes.REGISTER}>
          <RegisterPage />
        </Route>

        <Route exact path={ClientRoutes.RESTAURANT_MENU}>
          <RestaurantMenuPage />
        </Route>

        <Route exact path={ClientRoutes.HOME_COMERCIANTE}>
          <HomePageComerciante />
        </Route>

        <Route exact path={ClientRoutes.HOME_REPARTIDOR}>
          <HomePageRepartidor />
        </Route>

        {/* LoggedInRoute requiring route, otherwise Redirects to Login */}
        <LoggedInRoute exact path={ClientRoutes.PROFILE}>
          <ProfilePage />
        </LoggedInRoute>

        <LoggedInRoute exact path={ClientRoutes.RESTAURANT_CREATE}>
          <RestaurantsCreatePage />
        </LoggedInRoute>

        <LoggedInRoute exact path={ClientRoutes.RESTAURANT_MODIFIED}>
          <RestaurantsModifiedPage />
        </LoggedInRoute>

        <LoggedInRoute exact path={ClientRoutes.RESTAURANT_MODIFIED_SELECTOR}>
          <RestaurantsModifiedPageSelector />
        </LoggedInRoute>

        <LoggedInRoute exact path={ClientRoutes.RESTAURANT_DELETE}>
          <RestaurantsDeletePage />
        </LoggedInRoute>

        <LoggedInRoute exact path={ClientRoutes.PRODUCT_CREATE}>
          <ProductCreatePage />
        </LoggedInRoute>

        <Route exact path={ClientRoutes.CHECKOUT}>
          <WizardPage />
        </Route>
        <Route exact path={ClientRoutes.ORDERS_LIST}>
          <RestaurantOrders />
        </Route>

        <Route exact path={ClientRoutes.ORDERS_LIST_DISTRIBUTOR}>
          <RepartidorOrders />
        </Route>

        <Route exact path={ClientRoutes.ORDERS_LIST_CLIENT}>
          <ClientOrders />
        </Route>

        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
