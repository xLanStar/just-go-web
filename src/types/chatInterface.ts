export interface Chat {
  role: "bot" | "user";
  content: string;
}

export interface Place {
  day: number;
  name: string;
  placeId: string;
  photo: string | undefined;
  rating: number | undefined;
}
