import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react'
import { CategoryProvider } from "./context/CategoryContext";
import { QueryClient, QueryClientProvider } from "react-query";
// import { ReactQueryDevtools } from "react-query-devtools";

const client = new QueryClient();
ReactDOM.render(
  <QueryClientProvider client={client}>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <CategoryProvider>
      <App />
      </CategoryProvider>

  {/* <ReactQueryDevtools></ReactQueryDevtools> */}
    </PersistGate>
  </Provider>

  </QueryClientProvider>,
  document.getElementById("root")
);