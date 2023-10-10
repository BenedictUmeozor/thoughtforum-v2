import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "../layout/Loader";

const RootLayout = lazy(() => import("../layout"));
const Home = lazy(() => import("../pages/Home"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <Suspense fallback={<Loader />}>
          <RootLayout />
        </Suspense>
      }
    >
      <Route index element={<Home />} />
    </Route>
  )
);

export default router;
