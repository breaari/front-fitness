import { configureStore } from "@reduxjs/toolkit";
import fitnessReducer from "../Slice/Slice"

export default configureStore({
  reducer: {
    fitness: fitnessReducer
  }
});
