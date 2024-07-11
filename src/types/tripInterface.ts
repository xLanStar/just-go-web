export interface TripInfo {
  id: number;
  title: string;
  image: string;
  update: number;
  labels: string[];
  like: number;
  likeByMe: boolean;
  isShare: boolean;
  deletable: boolean;
}
