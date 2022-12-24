import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ApiPlat from "../../api/axios/plat/plat.api";

const initialState = {
  data: {
    plat: [],
    plats: [],
  },
  status: false,
  fecthStatus: "idle",
  error: null,
};

export const GetPlats = createAsyncThunk("get all plat", async () => {
  try {
    const res = await ApiPlat.getPlats();
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
});

export const CreatePlat = createAsyncThunk("create plat", async (data) => {
  try {
    const res = await ApiPlat.createPlat(data);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
});

export const GetPlat = createAsyncThunk("get plat by id", async (id) => {
  try {
    const res = await ApiPlat.getPlat(id);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
});

export const UpdatePlat = createAsyncThunk("update plat", async (data) => {
  try {
    const res = await ApiPlat.updatePlat(data.id, data.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
});

export const DeletePlat = createAsyncThunk("delete plat", async (id) => {
  try {
    const res = await ApiPlat.deletePlat(id);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
});

const PlatSlice = createSlice({
  name: "plat",
  initialState,
  extraReducers: (builder) => {
    builder
      // Get plats
      .addCase(GetPlats.pending, (state) => {
        state.fecthStatus = "loading";
      })
      .addCase(GetPlats.fulfilled, (state, action) => {
        state.fecthStatus = "success";
        state.data.plats = action.payload;
      })
      .addCase(GetPlats.rejected, (state, action) => {
        state.fecthStatus = "failed";
        state.error = action.error.message;
      })
      // Create plat
      .addCase(CreatePlat.pending, (state) => {
        state.fecthStatus = "loading";
      })
      .addCase(CreatePlat.fulfilled, (state, action) => {
        state.fecthStatus = "success";
        state.status = !state.status;
        state.data.plats.push(action.payload);
      })
      .addCase(CreatePlat.rejected, (state, action) => {
        state.fecthStatus = "failed";
        state.error = action.error.message;
      })
      // Get Plat
      .addCase(GetPlat.pending, (state) => {
        state.fecthStatus = "loading";
      })
      .addCase(GetPlat.fulfilled, (state, action) => {
        state.fecthStatus = "success";
        state.status = !state.status;
        state.data.plat = Object.assign({}, action.payload);
      })
      .addCase(GetPlat.rejected, (state, action) => {
        state.fecthStatus = "failed";
        state.error = action.error.message;
      })
      // Update plat
      .addCase(UpdatePlat.pending, (state) => {
        state.fecthStatus = "loading";
      })
      .addCase(UpdatePlat.fulfilled, (state, action) => {
        state.fecthStatus = "success";
        state.status = !state.status;
        const plat = action.payload.plat;
        const indexData = state.data.plats.findIndex(
          (value) => value.plat === plat
        );
        const newArr = [...state.data.plats];
        if (indexData >= 0) {
          newArr[indexData] = action.payload;
        }
        state.data.plats = [...newArr];
      })
      .addCase(UpdatePlat.rejected, (state, action) => {
        state.fecthStatus = "failed";
        state.error = action.error.message;
      })
      // Delete plat
      .addCase(DeletePlat.pending, (state) => {
        state.fecthStatus = "loading";
      })
      .addCase(DeletePlat.fulfilled, (state, action) => {
        state.fecthStatus = "success";
        state.status = !state.status;
        state.data.plats = state.data.plats.filter(
          (val) => val.plat !== action.payload.plat
        );
      })
      .addCase(DeletePlat.rejected, (state, action) => {
        state.fecthStatus = "failed";
        state.error = action.error.message;
      });
  },
});

export default PlatSlice.reducer;
