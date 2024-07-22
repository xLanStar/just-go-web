import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUser, register, signin } from "../../apis/auth";
import { User } from "../../types/userInterface";
import { changeUser } from "../../apis/user";
import { handleError } from "../../utils/handleError";

interface UpdatePayload {
  uuid: string,
  name: string,
  email: string,
  avatar: File | null
}

interface SigninPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface UserState {
  user: User;
}

const initialState: UserState = {
  user: getUser(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    }).addCase(registerUser.rejected, (_, action: PayloadAction<any>) => {
      handleError(action.payload, "帳號已存在");
    }).addCase(signinUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    }).addCase(signinUser.rejected, (_, action: PayloadAction<any>) => {
      handleError(action.payload, "帳號或密碼錯誤");
    }).addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    }).addCase(updateUser.rejected, (_, action: PayloadAction<any>) => {
      handleError(action.payload, "修改個人資料失敗");
    })
  }
});

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ uuid, name, email, avatar }: UpdatePayload, { rejectWithValue }) => {
    try {
      const user = await changeUser(uuid, name, email, avatar);
      return user;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
)

export const signinUser = createAsyncThunk(
  "user/signinUser",
  async ({ email, password }: SigninPayload, { rejectWithValue }) => {
    try {
      const user = await signin(email, password);
      return user;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
)

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async ({ name, email, password}: RegisterPayload, { rejectWithValue }) => {
    try {
      const user = await register(name, email, password, false);
      return user;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export default userSlice;
