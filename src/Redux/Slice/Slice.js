import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productos: [],
  categoriasSelected: [],
  subcategoriasSelected: [],
  categorias: [],
  subcategorias: [],
  allSubcategorias: [],
  query: "",
};

const Slice = createSlice({
  name: "fitness",
  initialState,
  reducers: {
    setProductos: (state, action) => {
      state.productos = action.payload;
    },
    setCategoriasSelected: (state, action) => {
      state.categoriasSelected = action.payload;
    },
    toggleCategoriaSelected: (state, action) => {
      const categoriaId = action.payload;
      const index = state.categoriasSelected.indexOf(categoriaId);
      if (index !== -1) {
        state.categoriasSelected.splice(index, 1);
      } else {
        state.categoriasSelected.push(categoriaId);
      }
    },
    setSubcategoriasSelected: (state, action) => {
      state.subcategoriasSelected = action.payload;
    },
    toggleSubcategoriaSelected: (state, action) => {
      const subcategoriaId = action.payload;
      const index = state.subcategoriasSelected.indexOf(subcategoriaId);
      if (index !== -1) {
        state.subcategoriasSelected.splice(index, 1);
      } else {
        state.subcategoriasSelected.push(subcategoriaId);
      }
    },
    setCategorias: (state, action) => {
      state.categorias = action.payload;
    },
    setSubcategorias: (state, action) => {
      state.subcategorias = action.payload;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setAllSubcategorias: (state, action) => {
      state.allSubcategorias = action.payload;
    },

  }
});

export const {
  setProductos,
  setCategoriasSelected,
  toggleCategoriaSelected,
  setSubcategoriasSelected,
  toggleSubcategoriaSelected,
  setCategorias,
  setSubcategorias,
  setQuery,
  setAllSubcategorias
} = Slice.actions;
export default Slice.reducer;
