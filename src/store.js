import { configureStore } from "@reduxjs/toolkit";
import speciesRducer from "./features/species/speciesSlice";

export const store = configureStore({
    reducer : {
     species : speciesRducer,
    }
})