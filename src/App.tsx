import React from 'react';
import List from "./containers/List/List";
import AddItem from "./containers/Add-Item/Add-Item";

function App() {


  return (
    <div >
      <header className='bg-dark'>
        <AddItem/>
      </header>
      <main className='container-sm'>
        <List/>
      </main>

    </div>
  );
}

export default App;
