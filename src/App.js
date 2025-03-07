import { useState } from 'react';
import './App.css';
import Modal from './components/Modal';


function App() {
 const [modal, setModal] = useState(false);

  return (
    <div className="App">
      <h2>Вітаємо Вас в нашій клініці. </h2>
      {!modal && <button onClick={() => setModal(true)}>Відкрити список лікарів</button>}
      <Modal isOpen={modal} close={() => setModal(false)}>
        
      </Modal>
    </div>
  );
}

export default App;
