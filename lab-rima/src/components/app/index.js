import React from 'react';
import createStore from '../lib/store';
import {Provider} from 'react-redux';
import {BrowserRouter, Route} from 'react-router-dom';
import Dashboard from '../dashboard/index';


const store = createStore();

class App extends React.Component{
  componentDidMount(){
    store.subscribe(() => {
      console.log('__STATE__:', store.getState());
    });
  }

  render(){
    return(
      <main className="app">
        <Provider store={store}>
          <BrowserRouter>
            <div className="routes">
              <Route exact path="/" component={Dashboard} />
            </div>
          </BrowserRouter>
        </Provider>
      </main>
    );
  }
}

export default App;
