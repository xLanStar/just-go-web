export type LatLngLiteral = google.maps.LatLngLiteral;
export type MapOptions = google.maps.MapOptions;
export type AutoComplete = google.maps.places.Autocomplete;
export type PlacesService = google.maps.places.PlacesService;
export type PlaceSearchRequest = google.maps.places.PlaceSearchRequest;

export interface Mark {
  name: string;
  location: LatLngLiteral;
  placeID: string;
}
