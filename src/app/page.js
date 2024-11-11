'use client'
import MainPage from "./MainPage/page";
import { Provider } from 'react-redux';
import store from './store'; // Import the store from the configured Redux store file

export default function Home() {
  return (
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
}
