import React, {useState} from 'react';
import {ApiToDo,toDoItemMutation} from "../../type";
import ButtonSpinner from "../Spinner/ButtonSpinner";

interface Props{
  onSubmit:(item:ApiToDo) => void;
  isCreating:boolean;
}

const Form:React.FC<Props> = ({onSubmit, isCreating}) => {
  const [item, setItem] = useState<toDoItemMutation>({
    text:'',
    isDone:false,
  });

  const onTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setItem(prev => ({...prev, [name]: value}));
  };

  const onFormSubmit = (e:React.FormEvent) => {
    e.preventDefault();
    onSubmit({...item});
    setItem({...item, text:''});
  };



  return (
    <form onSubmit={onFormSubmit} className='d-flex flex-column align-items-center mt-3'>
      <textarea onChange={onTextChange} required value={item.text} name='text' placeholder='Your task' className='mb-2' cols={40} rows={7} style={{resize:'none', borderRadius:'10px'}}/>
      <button type='submit' className='btn btn-outline-success' disabled={isCreating}>{isCreating && <ButtonSpinner/>}Save</button>
    </form>
  );
};

export default Form;