import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { List, Bike } from './';

export { Bikes };

function Bikes({ match }) {
    const { path } = match;
    
    return (
        <div className="p-4">
            <div className="container">
                <Switch>
                    <Route exact path={path} component={List} />
                    <Route path={`${path}/bike/:id`} component={Bike} />
                </Switch>
            </div>
        </div>
    );
}
