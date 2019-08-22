import React from 'react';
import ReactDOM from 'react-dom';
import User from './components/UserForm';

import './index.css';

function App() {
  return (
    <div className="App">
      <User />
    </div>
  );
}

export default App;

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

