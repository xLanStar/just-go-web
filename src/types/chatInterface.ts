export interface Chat {
  role: "bot" | "user";
  type: "text" | "attraction";
  content: Place[] | string;
}

export interface Place {
  day: number;
  name: string;
  placeId: string;
  photo: string | undefined;
  rating: number | undefined;
}
