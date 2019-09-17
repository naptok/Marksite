import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from 'shared/App';

const Root = _ => (
  <BrowserRouter>
    <App/>
  </BrowserRouter>
);

export default Root;