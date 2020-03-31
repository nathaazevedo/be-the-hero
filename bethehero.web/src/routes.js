import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Logon from './views/Logon';
import Register from './views/Register';
import Profile from './views/Profile';
import NewIncident from './views/NewIncident';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon}></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/profile" component={Profile}></Route>
                <Route path="/incidents/new" component={NewIncident}></Route>
            </Switch>
        </BrowserRouter>
    );
}