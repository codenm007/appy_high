import React from 'react';
import ReactDOM from 'react-dom';
import Landing_page from './pages/landing';
import Call from './pages/Call';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

const App = () =>{
    return (
        <div>
          
    
          <BrowserRouter>
            <Switch>
              
              <Route path="/" exact component={Landing_page} />
              <Route path="/connect_call" component={Call} />
            </Switch>
          </BrowserRouter>
        </div>
        // http://localhost:3000/watch/bhdsjbvbsBZhvVbkjdav
      );

}

export default App;