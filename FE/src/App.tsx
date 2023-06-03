import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './i18n';
import { Suspense } from 'react';
import { store, persistor } from './store';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import ThemeProviderWrapper from './ThemeProviderWrapper';


function App() {
  return (
    <Suspense fallback="...is loading">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProviderWrapper>
            <RouterProvider router={router} />
          </ThemeProviderWrapper>
        </PersistGate>
      </Provider>
    </Suspense>
  )
}

export default App;
