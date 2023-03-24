import Dashboard from "./components/dashboard/Dashboard";
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import SVtheme from "./themes/SVtheme";
import {ThemeProvider} from "@mui/material/styles";
import store from "./store/store";
import { Provider } from "react-redux";
import {initBackendApiClient} from "./api";

const queryClient = new QueryClient()
initBackendApiClient(store)

function App() {
  return (
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={SVtheme}>
                <Provider store={store}>
                    <Dashboard />
                </Provider>
            </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
      </BrowserRouter>
  );
}

export default App;
