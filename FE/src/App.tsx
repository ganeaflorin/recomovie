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
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';


function App() {
  const { t } = useTranslation('common');

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProviderWrapper>
          <Suspense fallback={<Typography>{t('loading')}</Typography>}>
            <RouterProvider router={router} />
          </Suspense>
        </ThemeProviderWrapper>
      </PersistGate>
    </Provider>
  )
}

export default App;
