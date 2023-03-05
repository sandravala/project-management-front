import Dashboard from "./components/dashboard/Dashboard";
import {BrowserRouter} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import SVtheme from "./themes/SVtheme";
import {ThemeProvider} from "@mui/material/styles";

const queryClient = new QueryClient()

function App() {
  return (
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={SVtheme}>
                <Dashboard />
            </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
      </BrowserRouter>
  );
}

export default App;
