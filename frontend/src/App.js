import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/" exact component={Dashboard} />
                </Switch>
            </div>
        </Router>
    );
}

export default App;