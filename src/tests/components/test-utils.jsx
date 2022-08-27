import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter as Router, Route} from "react-router-dom";
import { setupStore } from '../../app/store'
import { setAuthedUser } from '../../actions/authedUser';
import {createMemoryHistory} from 'history';



export const  renderWithProviders = (
    ui,   
    {
      initState = {},
      authedUser = null,
      // Automatically create a store instance if no store was passed in
      store = setupStore(initState),
      route = '/',
      history = createMemoryHistory({ initialEntries: [route] }),
      ...renderOptions
    } = {}
  ) => {
    function Wrapper({ children }) {
      
      return (
        <Provider store={store}>
          <Router initialEntries={[route]}>
            {children}
          </Router>
        </Provider>
      )
        
    }
  
    if(authedUser) store.dispatch(setAuthedUser('mthornton'));
    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
  }