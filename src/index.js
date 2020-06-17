import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

// redux persist stuffs
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'


// create a redux store
import { createStore } from 'redux'
import appReducer from './js/reducers'

import AppRouter from './js/AppRouter'

import registerServiceWorker from './registerServiceWorker'

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, appReducer)

// create store
// let store = createStore(appReducer)
let store = createStore(persistedReducer)
// persistor for redux-persist
let persistor = persistStore(store)

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppRouter />
    </PersistGate>
    {/*<App />*/}
  </Provider>, 
  document.getElementById('root')
)



registerServiceWorker();
