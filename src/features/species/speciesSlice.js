import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../apolloClient";
import { gql } from "@apollo/client";

export const fetchSpecies = createAsyncThunk(
  "species/fetchSpecies",
  async () => {
    const response = await client.query({
      query: gql`
        {
          allSpecies {
            species {
              name
              classification
              eyeColors
              hairColors
              skinColors
              language
              averageHeight
              averageLifespan
            }
          }
        }
      `,
    });
    console.log(response.data.allSpecies.species);
    return response.data.allSpecies.species;
  }
);

const initialState = {
  specieslist: [],
  status: "idle",
  error: null,
};

const speciesSlice = createSlice({
  name: "species",
  initialState,
  reducers: {},
  extraReducers : (builder) => {
    builder.addCase(fetchSpecies.pending,(state,action) => {
        state.status = 'pending';
    })
    .addCase(fetchSpecies.fulfilled,(state,action) => {
        state.status = 'succeeded';
        state.specieslist = action.payload;
    })
    .addCase(fetchSpecies.rejected,(state,action) => {
        state.status = 'failed';
        state.error = action.error.message

    })
  }
});
export default speciesSlice.reducer;
