import React, {useEffect} from 'react';
import Item from "../../components/Item/item";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchItems} from "./ListThunk";
import Spinner from "../../components/Spinner/Spinner";
import {ApiToDo} from "../../type";
import {updateItem} from "./ListSlice";


const List = () => {
  const dispatch = useAppDispatch();
  const toDoItems = useAppSelector(state => state.toDoList.items);
  const isLoadingState = useAppSelector(state => state.toDoList.fetchLoading);
  const updateItemList = async (id: string, item: ApiToDo) => {
    try {
      await dispatch(updateItem({id: id, itemParam: item}));
      await dispatch(fetchItems());
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  return (<div className='d-flex flex-sm-column-reverse'>
      {isLoadingState === 'pending' ? <Spinner/> : toDoItems.map((item) => (<Item
          key={item.id}
          item={item}
          isDone={item.isDone}
          isUpdate={updateItemList}/>))}
    </div>);
};

export default List;