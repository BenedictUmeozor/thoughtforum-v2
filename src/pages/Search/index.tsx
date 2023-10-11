import HotQuestions from "../../components/HotQuestions";
// import Question from "../../components/Question";
import TopMembers from "../../components/TopMembers";
import Container from "../../layout/Container";

import styles from "./search.module.scss";
import { Search } from "react-feather";

const SearchPage = () => {
  return (
    <main className={styles.main}>
      <Container className={styles.container}>
        <div className={styles.left}>
          <div className={styles.search}>
            <h2>Enter your search:</h2>
            <div className={styles.searchBar}>
              <Search />
              <input type="text" placeholder="Search here" />
            </div>
          </div>

          <p className={styles.count}>
            Showing <span>5</span> results
          </p>

          <div className={styles.results}>
            <p className={styles.text}>
              No results returned for <span>sjwev</span>
            </p>
          </div>

          {/* <div className={styles.results}>
            <Question />
            <Question />
            <Question />
          </div> */}
        </div>
        <div className={styles.right}>
          <HotQuestions />
          <TopMembers />
        </div>
      </Container>
    </main>
  );
};
export default SearchPage;
