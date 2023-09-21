import styles from './preloader.module.css'

function PreloaderOrder() {
  return (
    <>
      <span className={styles.bg}></span>
      <span className={styles.loader}></span>
    </>
  )
}

export default PreloaderOrder;
