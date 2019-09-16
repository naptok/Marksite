import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Menu } from 'components';
import { Home, About } from 'scenes';


class App extends Component {
    render() {
        return (
            <div>
                <Menu />
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route path="/about/:foo" component={About} />
            </div>
        );
    }
}

export default App;