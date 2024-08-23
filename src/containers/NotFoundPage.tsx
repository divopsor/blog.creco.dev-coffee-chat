import { Colors, ResponsivePage } from '@divops-packages/blog-creco-dev';
import styles from './HomePage.module.css';

export default function NotFoundPage() {
  return (
    <div className={styles.container}>
      <ResponsivePage
        mainBackgroundColor={Colors.White}
        subBackgroundColor={Colors.SoftWhite}
        fontColor={Colors.Dark}
        desktopPageWidth="1240px"
      >
        <h1>404 - Not Found</h1>
        <h3>페이지를 찾을 수 없습니다.</h3>
      </ResponsivePage>
    </div>
  )
};
