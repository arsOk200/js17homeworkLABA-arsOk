import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi";
import {ApiToDoList, toDoItem} from "../../type";

export const fetchItems = createAsyncThunk(
  'items/fetch',
  async () => {
    const itemsResponse = await axiosApi.get<ApiToDoList | null>('todoes.json');
    const items = itemsResponse.data;

    let newItems:toDoItem[] = [];

    if (items) {
      newItems = Object.keys(items).map(id => {
        const item = items[id];
        return {...item, id,}
      });
    }
    return newItems;
  }
)