import React, {useState} from 'react';
import {ApiToDo, toDoItem} from "../../type";
import {useAppDispatch} from "../../app/hooks";
import ButtonSpinner from "../Spinner/ButtonSpinner";
import {fetchItems} from "../../containers/List/ListThunk";
import {deleteItem} from "../../containers/List/ListSlice";

interface Props {
  item: toDoItem;
  isDone: boolean;
  isUpdate: (id: string, item: ApiToDo) => void;
}

const Item: React.FC<Props> = ({item, isDone, isUpdate}) => {
  const dispatch = useAppDispatch();
  const [deleting, setDeleting] = useState(false);

  const onCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    isUpdate(item.id, {...item, isDone: !item.isDone});
  };

  const onDelete = async (id: string) => {
    try {
      setDeleting(true);
      await dispatch(deleteItem({id}));
      await dispatch(fetchItems());
    } finally {
      setDeleting(false)
    }
  };


  let inputDiv = (<div className="card-header">
    <label className='m-0 me-3  pe-3 ps-3 text-bg-dark'>Not Done</label>
    <input id='checkbox' type="checkbox" onChange={onCheckboxChange}/>
  </div>);

  if (item.isDone) {
    inputDiv = (<div className="card-header">
      <label className='m-0 me-3  pe-3 ps-3 text-bg-success'>Done</label>
      <input id='checkbox' type="checkbox" defaultChecked={true} onChange={onCheckboxChange}/>
    </div>)
  }

  return (<div className="card mb-2 mt-2">
    {inputDiv}
    <div className="card-body">
      <p className="card-title">{item.text}</p>
      <div className='d-flex gap-2'>
        <button className='btn btn-outline-danger' onClick={() => onDelete(item.id)} disabled={deleting}>{deleting ?
          <ButtonSpinner/> : "Delete"}</button>
      </div>
    </div>
  </div>);
};

export default Item;