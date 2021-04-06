import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import store from './store';
import App from './App';

test('renders learn react link', () => {
  //const { getByText } = render(
    //<Provider store={store}>
      //<BrowserRouter>
        //<App />
      //</BrowserRouter>
    //</Provider>
  //);

  //expect(getByText(/WELCOME TO PANDEMIC PAL/)).toBeInTheDocument();
});
