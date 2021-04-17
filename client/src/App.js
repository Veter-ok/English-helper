import {BrowserRouter as Router} from 'react-router-dom';
import React, {setState} from 'react';
import {useRoutes} from './routes'
import {UserContext} from './UserContext';

export default function App() {
  const routes = useRoutes(false);
  // const [auth, setAuth] = setState(false);

  return (
    
    <Router>
        <div>
          <UserContext.Provider>
          {/* <UserContext.Provider value={{auth, setAuth}}> */}
            {routes}
          </UserContext.Provider>
        </div>
    </Router>
  );
}