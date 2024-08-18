export type LatLngLiteral = google.maps.LatLngLiteral;
export type MapOptions = google.maps.MapOptions;
export type AutoComplete = google.maps.places.Autocomplete;
export type PlacesService = google.maps.places.PlacesService;
export type PlaceSearchRequest = google.maps.places.PlaceSearchRequest;
export type PlaceDetailsRequest = google.maps.places.PlaceDetailsRequest;

export interface Mark {
  name: string;
  location: LatLngLiteral;
  placeId: string;
}

export interface PlaceDetail {
  name: string;
  photo: string | undefined;
  rating: number | undefined;
  address: string;
  phone: string | undefined;
  website: string | undefined;
  opening_hours: string[] | undefined;
}
