import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../services/api";
import { User } from "../models/User";

const token = localStorage.getItem("token");

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};
type Payload = {
    id: number;
    active: boolean;
}
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await api.get(`/Account/all-users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch users.");
  }
});

export const setUserStatus = createAsyncThunk(
  "users/setUserStatus",
  async ({ id, active }: Payload, thunkAPI) => {
    try {
      const response = await api.put(
        `/Account/set-account-status/${id}`,
        active,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to set user status.");
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export default usersSlice.reducer;
