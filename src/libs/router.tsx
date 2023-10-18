import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "../layout/Loader";
import ErrorPage from "../pages/404";

const RootLayout = lazy(() => import("../layout"));
const Home = lazy(() => import("../pages/Home"));
const Register = lazy(() => import("../pages/(auth)/Register"));
const Login = lazy(() => import("../pages/(auth)/Login"));
const Questions = lazy(() => import("../pages/Questions"));
const Profile = lazy(() => import("../pages/(user)/Profile"));
const UserProfile = lazy(() => import("../pages/(user)/UserProfile"));
const Categories = lazy(() => import("../pages/Categories"));
const SearchPage = lazy(() => import("../pages/Search"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={
        <Suspense fallback={<Loader />}>
          <RootLayout />
        </Suspense>
      }
      errorElement={<ErrorPage />}
    >
      <Route index element={<Home />} />
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="search" element={<SearchPage />} />
      <Route path="profile" element={<Profile />} />
      <Route path="questions/:id" element={<Questions />} />
      <Route path="categories" element={<Categories />} />
      <Route path="user/:id" element={<UserProfile />} />
      <Route path="*" element={<ErrorPage />} />
    </Route>
  )
);

export default router;
