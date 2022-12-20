import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ApiToDo, toDoItem} from "../../type";
import {fetchItems} from "./ListThunk";
import {RootState} from "../../app/store";
import axiosApi from "../../axiosApi";


interface toDoState {
  items: toDoItem[];
  fetchLoading: 'idle' | 'pending' | 'success' | 'failure',
}

interface createItem {
  item: ApiToDo;
}

interface UpdateParams {
  id: string;
  itemParam: ApiToDo;
}


const initialState: toDoState = {
  items: [], fetchLoading: 'idle',
};

interface deleteID {
  id: string;
}


export const addNewItem = createAsyncThunk<void, createItem, { state: RootState }>('toDoList/increment', async (arg) => {
  await axiosApi.post('/todoes.json', arg.item);
});

//
export const deleteItem = createAsyncThunk<void, deleteID, { state: RootState }>('toDoList/delete', async (arg) => {
  await axiosApi.delete('/todoes/' + arg.id + '.json');
});

export const updateItem = createAsyncThunk<void, UpdateParams, { state: RootState }>('todoList/update', async (arg) => {
  await axiosApi.put('/todoes/' + arg.id + '.json' + arg.itemParam);
});


export const listSlice = createSlice({
  name: 'toDoList', initialState, reducers: {}, extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.fetchLoading = 'pending';
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.fetchLoading = 'success';
      state.items = action.payload;
    });
    builder.addCase(fetchItems.rejected, (state) => {
      state.fetchLoading = 'failure';
    });
  },
});

export const toDoReducer = listSlice.reducer;

