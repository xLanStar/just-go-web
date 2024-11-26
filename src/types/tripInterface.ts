export interface TripInfo {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  title: string;
  image: string;
  day: number;
  publishDay: string;
  labels: string[];
  like: number;
  isLike: boolean;
  isPublic: boolean;
}

export interface Trip {
  tripInfo: TripEditInfo;
  plans: Plan[];
}

export interface TripEditInfo {
  id: string;
  userId: string;
  title: string;
  image: string;
  description: string;
  editPermission: number;
  finalPlanId: string;
  departureDate: string;
  endDate: string;
  labels: string[];
  like: number;
  linkPermission: boolean;
  isPublic: boolean;
  publishDay: string;
}

export interface Plan {
  id: string;
  name: string;
}

export interface Day {
  id: string;
  planId: string;
  startAttractionId: string;
}

export interface Attraction {
  id: string;
  dayId: string;
  googlePlaceId: string;
  startAt: string;
  endAt: string;
  note: string;
}
