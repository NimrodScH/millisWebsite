import HomePage from "./pages/Home";
import Contact from "./pages/Contact";
import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import Projects from "./pages/Projects";
import AboutPage from "./pages/About";
import QAPage from "./pages/QA";
import Articles from "./pages/Articles";
import ArticleTemplate from "./pages/Article";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PopChat } from "ai-crw"; // Import the PopChat component
const router = createBrowserRouter([
  {
    element: (
      <>
        <RootLayout />
        <PopChat/>
      </>
    ),
    children: [
      { path: "/",  element: <HomePage />},
      { path: "/contact", element: <Contact />},
      { path: "/projects", element: <Projects />},
      { path: "/about", element: <AboutPage />},
      { path: "/questions", element: <QAPage />},
      { path: "/articles", element: <Articles />},
      {
        path: "/articles/:articleId",
        element: <ArticleTemplate />,  errorElement: <ErrorPage/>
      },
      { path: "*", element: <ErrorPage /> }
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
