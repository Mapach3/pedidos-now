import { MapPoint } from "../models/models";

//Funcion para calcular la distancia entre dos puntos en KM, teniendo en cuenta la redondez de la Tierra.
//https://cloud.google.com/blog/products/maps-platform/how-calculate-distances-map-maps-javascript-api
export const haversine_distance = (mk1: MapPoint, mk2: MapPoint): number => {
  var R = 6371.071; // Radius of the Earth in miles
  var rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
  var rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
  var difflat = rlat2 - rlat1; // Radian difference (latitudes)
  var difflon = (mk2.lng - mk2.lng) * (Math.PI / 180); // Radian difference (longitudes)

  var d =
    2 *
    R *
    Math.asin(
      Math.sqrt(
        Math.sin(difflat / 2) * Math.sin(difflat / 2) +
          Math.cos(rlat1) *
            Math.cos(rlat2) *
            Math.sin(difflon / 2) *
            Math.sin(difflon / 2)
      )
    );

  return +d.toFixed(2);
};
