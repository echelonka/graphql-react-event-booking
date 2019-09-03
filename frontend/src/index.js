import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import axios from 'axios'

axios.defaults.baseURL = `http://${window.location.host.split(':')[0]}:8000`

ReactDOM.render(<App />, document.getElementById('root'));
