import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { useTranslation } from "react-i18next";
import './i18n';
import { Suspense } from 'react';
import { Languages } from './entities/common';
import { store, persistor } from './store';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';

// {
//   {
//     languages.map((lng) => (
//       <button key={lng} style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }} type="submit" onClick={() => i18n.changeLanguage(lng)}>
//         {t(`languages.${lng}`)}
//       </button>
//     ))
//   }
// }

function App() {
  const { t } = useTranslation(["common"]);
  const languages = Object.keys(Languages);

  return (
    <Suspense fallback="...is loading">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </Suspense>
  )
}

export default App;
