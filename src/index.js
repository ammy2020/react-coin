import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/common/Header';
import List from './components/common/list/List';
import NotFound from './components/NotFound/NotFound';
import Detail from './components/Detail/Detail';
import './index.css';

// function component
const App = () => {
    // const title = 'React coin';
    return (
        <BrowserRouter>
            <div>
                <Header />

                <Switch>
                    <Route  path = "/" component={ List } exact />
                    <Route  path = "/currency/:id" component= { Detail  } exact/>
                    <Route  component = { NotFound } />
                </Switch>
            </div>
        </BrowserRouter>
    );
}

ReactDom.render(
    <App />,
    document.getElementById('root')
);
