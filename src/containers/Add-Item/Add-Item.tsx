import React, {useState} from 'react';
import Form from "../../components/form/Form";
import {ApiToDo} from "../../type";
import {useAppDispatch} from "../../app/hooks";
import {addNewItem} from "../List/ListSlice";
import {fetchItems} from "../List/ListThunk";

const AddItem = () => {
  const [creating, setCreating] = useState(false);
  const dispatch = useAppDispatch();

  const createItem = async (item: ApiToDo) => {
    try {
      setCreating(true);
      await dispatch(addNewItem({item}));

    } finally {
      setCreating(false);
      await dispatch(fetchItems());
    }
  };

  return (<div className='border-bottom p-2 bg-dark'>
    <Form onSubmit={createItem} isCreating={creating}/>
  </div>);
};

export default AddItem;