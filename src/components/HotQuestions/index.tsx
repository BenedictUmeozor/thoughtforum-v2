import HotQuestion from "./HotQuestion"
import styles from "./hot.module.scss"

const HotQuestions = () => {
  return (
    <div className={styles.div}>
        <HotQuestion />
        <HotQuestion />
        <HotQuestion />
    </div>
  )
}
export default HotQuestions