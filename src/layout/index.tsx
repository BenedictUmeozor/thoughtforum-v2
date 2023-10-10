import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import styles from "./layout.module.scss";
import { useThemeContext } from "../hooks";
import { Suspense, useEffect } from "react";
import { getTheme } from "../utils";
import Loader from "./Loader";
import Footer from "../components/Footer";

const RootLayout = () => {
  const { _setTheme } = useThemeContext();

  useEffect(() => {
    const { theme } = getTheme();
    _setTheme(theme);
  }, [_setTheme]);

  return (
    <main className={styles.main}>
      <Header />
      <section>
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </section>
      <Footer />
    </main>
  );
};
export default RootLayout;
