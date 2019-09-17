import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home, About, Posts, Post, Contact } from 'pages';
import { Menu, Footer } from 'components';

class App extends Component {
  render() {
    return (
      <div>
        <Menu/>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/contact" component={Contact}/>
        <Route path="/post" component={Post}/>
        <Switch>
          <Route path="/posts/:id" component={Posts}/>
          <Route path="/posts" component={Posts}/>
        </Switch>
        <Footer/>
      </div>
    );
  }
}

export default App;