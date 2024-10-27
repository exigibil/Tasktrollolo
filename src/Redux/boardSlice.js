import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAuthToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found, authorization required');
  }
  return token;
};


export const fetchBoards = createAsyncThunk("boards/fetchBoards", async (_, thunkAPI) => {
  const token = localStorage.getItem("token");
  try {
    const response = await axios.get("http://localhost:2000/auth/boards/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});




export const createBoard = createAsyncThunk(
  'boards/addBoard',
  async ( _, thunkAPI) => {
    try {
      const token = getAuthToken();
      const response = await axios.post(
        'http://localhost:2000/auth/boards/',
     
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);


// export const fetchFood = createAsyncThunk(
//   'food/fetchAll',
//   async (_, thunkAPI) => {
//     try {
//       const token = getAuthToken();
//       const response = await axios.get('http://localhost:8000/food/', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

// export const searchFood = createAsyncThunk(
//   'food/searchAll',
//   async ({ title = '', category = '' } = {}, thunkAPI) => {
//     try {
//       const token = getAuthToken();
//       const response = await axios.get('http://localhost:8000/food/search', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         params: { title, category },
//       });
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );



// export const deleteFood = createAsyncThunk(
//   'food/deleteFood',
//   async (foodItemId, thunkAPI) => {
//     try {
//       const token = getAuthToken();
//       const response = await axios.delete(
//         'http://localhost:8000/food/remove-diary',
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           data: { foodItemId },
//         }
//       );
//       return response.data.diary;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );



const boardSlice = createSlice({
  name: 'boards',
  initialState: {
      items: [],
      isLoading: false,
      error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
      builder
          .addCase(fetchBoards.pending, (state) => {
              state.isLoading = true;
          })
          .addCase(fetchBoards.fulfilled, (state, action) => {
              state.isLoading = false;
              state.items = action.payload; // Asigură-te că payload-ul este un array
          })
          .addCase(fetchBoards.rejected, (state, action) => {
              state.isLoading = false;
              state.error = action.error.message;
          });
  },
});

export const boardReducer = boardSlice.reducer;
export default boardSlice;
