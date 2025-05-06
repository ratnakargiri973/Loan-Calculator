import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import ExchangeRates from "../pages/ExchangeRates";
import Error from "../pages/Error";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'about',
                element: <About />
            },
            {
                path: 'exchange_rates_live',
                element: <ExchangeRates />
            },
            {
                path: 'error_page',
                element: <Error />
            }
        ]
    }
])

export default router;