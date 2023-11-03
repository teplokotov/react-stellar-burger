import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadData } from '../../services/actions';
import { SET_CURRENT_ID } from '../../services/actions/currentId';
import IngredientDetails from '../../components/ingredient-details/ingredient-details';
import styles from './ingredient.module.css';
import { useParams } from 'react-router-dom';
import { RootState } from '../../services/types';

function Ingredient() {

  const dispatch = useDispatch();
  const { id } = useParams();
  const { data, isLoading, hasError } = useSelector((store: RootState) => store.data);

  const isFound = data.find((item) => item._id === id);

  React.useEffect(() => {
    dispatch(loadData());
    dispatch({
      type: SET_CURRENT_ID,
      payload: id,
    });
  },[dispatch, id]);

  return (
    <main className={styles.main}>

      {/* Loading or error messages */}
      {
        (isLoading || hasError || !isFound) && (
          <p className="text text_type_main-medium">
            {isLoading && 'Загрузка...'}
            {hasError && 'Произошла ошибка'}
            {!isFound && 'Ингредиент не найден... Может лучше 🍟 картошку фри ?'}
          </p>
        )
      }

      {/* Main block */}
      {
        !isLoading && !hasError && data.length && isFound &&
          (
            <>
              <h1 className="text text_type_main-large">Детали ингредиента</h1>
              <IngredientDetails />
            </>
          )
      }

    </main>
  );
}

export default Ingredient;
