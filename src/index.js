import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Viz from './viz'

ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<Viz />, document.getElementById('root'));
registerServiceWorker();
