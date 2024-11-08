export type LatLngLiteral = google.maps.LatLngLiteral;
export type MapOptions = google.maps.MapOptions;
export type AutoComplete = google.maps.places.Autocomplete;
export type PlacesService = google.maps.places.PlacesService;
export type PlaceSearchRequest = google.maps.places.PlaceSearchRequest;
export type PlaceDetailsRequest = google.maps.places.PlaceDetailsRequest;
export type FindPlaceFromQueryRequest = google.maps.places.FindPlaceFromQueryRequest;
export interface Mark {
  name: string;
  placeId: string;
  location: LatLngLiteral;
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

export interface Place {
  name: string;
  photo: string | undefined;
  rating: number | undefined;
  google_place_id: string;
}
