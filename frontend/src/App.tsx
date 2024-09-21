import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Countries from "./pages/Countries";
import CountryPage from "./pages/CountryPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Countries />,
    },
    {
      path: "/country/:code",
      element: <CountryPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
