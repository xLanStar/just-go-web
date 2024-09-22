import dayjs from "dayjs";

export interface SigninForm {
  name?: string;
  email: string;
  password: string;
  checkPassword?: string;
}

export interface ProfileForm {
  name: string;
  email: string;
}

export interface TripFrom {
  name: string;
  image: File | undefined;
  date: [dayjs.Dayjs, dayjs.Dayjs];
}
