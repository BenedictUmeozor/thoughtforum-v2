import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "../layout/Loader";

const RootLayout = lazy(() => import("../layout"));
const Home = lazy(() => import("../pages/Home"));
const Register = lazy(() => import("../pages/(auth)/Register"));
const Login = lazy(() => import("../pages/(auth)/Login"));
const Questions = lazy(() => import("../pages/Questions"));
const Profile = lazy(() => import("../pages/(user)/Profile"));
const UserProfile = lazy(() => import("../pages/(user)/UserProfile"));

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
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="questions" element={<Questions />} />
      <Route path="profile" element={<Profile />} />
      <Route path="profile/user" element={<UserProfile />} />
    </Route>
  )
);

export default router;
