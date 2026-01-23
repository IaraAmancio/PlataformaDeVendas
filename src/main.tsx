import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import router from './App.tsx';
import { RouterProvider } from 'react-router';
import {Toaster} from 'react-hot-toast';
import  AuthProvider from './contexts/authContext.tsx';

import { register } from 'swiper/element/bundle';

register();
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={false}/>
      <RouterProvider router={router}/>      
    </AuthProvider>
  </StrictMode>,
)
