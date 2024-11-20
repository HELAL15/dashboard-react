

import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.ts'
import 'react-toastify/dist/ReactToastify.css';
import 'swiper/css';
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import "react-toastify/dist/ReactToastify.css";
import { Flip, ToastContainer } from 'react-toastify';
import './i18n.tsx'
import { ConfigProvider } from 'antd'
import RouterProgress from './RouterProgress.tsx'
import { PersistGate } from 'redux-persist/integration/react'
import { useTranslation } from 'react-i18next'




// const lang = localStorage.getItem("i18nextLng")

// const direction = lang  === 'ar' ? "rtl" : "ltr"

// const lang1 = useSelector((state:RootState) => state.lang.value);

// console.log(lang1);

const MainApp = () => {
  const {i18n} = useTranslation()
  const lang = i18n.language
  const direction = lang  === 'ar' ? "rtl" : "ltr"
  console.log(lang , direction);
 
  return (
    <ConfigProvider direction={direction}>
      <RouterProgress/>
      <PersistGate loading={null} persistor={persistor} >
         <App />
      </PersistGate>
      <ToastContainer
          position="top-center"
          autoClose={2000}
          newestOnTop
          closeOnClick
          rtl={lang === 'ar' ? true : false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Flip}
          theme="dark"
        />
     
    </ConfigProvider>
  );
};

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
      <Router>
          <MainApp />
      </Router>
  </Provider>
);
