import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import createStore from './ducks';
import './index.css';
import App from './components/app/App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(window.REDUX_DATA);

const jsx = (
    <ReduxProvider store={store}>
        <Router>
            <App />
        </Router>
    </ReduxProvider>
);

// ReactDOM.hydrate(jsx, document.getElementById('root'));
ReactDOM.render(jsx, document.getElementById('root'));
registerServiceWorker();