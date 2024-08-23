import { CoffeeChatLanding } from '../components/CoffeeChatLanding';
import styles from './HomePage.module.css';

export function HomePage() {
  return (
    <div className={styles.container}>
      <CoffeeChatLanding />
    </div>
  )
};
