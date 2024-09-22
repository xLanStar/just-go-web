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
  upload: any;
  date: [dayjs.Dayjs, dayjs.Dayjs];
}
