import React from 'react';
import { data } from '../../utils/data';
import { AppHeader } from '../AppHeader';
import { BurgerConstructor } from '../BurgerConstructor';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import styles from './app.module.css';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <div className={`container ${styles.columns}`}>
        <BurgerIngredients data={data} />
        <BurgerConstructor data={data} />
      </div>
    </div>
  );
}

export default App;
