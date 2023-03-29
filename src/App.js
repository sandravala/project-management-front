import Dashboard from "./components/dashboard/Dashboard";
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import SVtheme from "./themes/SVtheme";
import {ThemeProvider} from "@mui/material/styles";
import { Provider } from "react-redux";
import {initBackendApiClient} from "./api";
import { persistor, store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';

const queryClient = new QueryClient()
initBackendApiClient(store)

function App() {
  return (
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={SVtheme}>
                <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <Dashboard />
                    </PersistGate>
                </Provider>
            </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
      </BrowserRouter>
  );
}

export default App;
