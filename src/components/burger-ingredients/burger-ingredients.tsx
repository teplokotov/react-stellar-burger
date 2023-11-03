import React from 'react';
import { useSelector } from "react-redux";
import burgerIngredientsStyles from './burger-ingredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientsGroup from './ingredients-group/ingredients-group';
import { ingredientsTypes } from '../../utils/constants';
import { RootState } from '../../services/types';

function BurgerIngredients() {

  const { data: ingredients } = useSelector((store: RootState) => store.data);

  // Initial state of tabs (Set first tab as active)
  const [current, setCurrent] = React.useState(Object.values(ingredientsTypes)[0]);

  const [ingredientsGroups, setIngredientsGroups] = React.useState<NodeListOf<Element>>();
  const [ingredientsArea, setIngredientsArea] = React.useState<Element | null>();

  function scrollToHeading(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  React.useEffect(() => {
    const ingredientsGroups = document.querySelectorAll('.ingredientsGroup');
    const ingredientsArea = document.querySelector('.ingredientsArea');
    setIngredientsGroups(ingredientsGroups);
    setIngredientsArea(ingredientsArea);
  },[]);

  function changeActiveTab(sections: NodeListOf<Element>) {
    let currentSectionId = '';
    sections.forEach((section) => {
      if(ingredientsArea) {
        const ingredientsAreaOffsetTop = Math.ceil(ingredientsArea.getBoundingClientRect().top);
        if (ingredientsArea.scrollTop >= (section as HTMLElement).offsetTop - ingredientsAreaOffsetTop) currentSectionId = section.id;
      }
    });
    setCurrent(ingredientsTypes[currentSectionId as keyof typeof ingredientsTypes]);
  }

  return (
    <section className={`${burgerIngredientsStyles.leftSection}`}>
      <h1 className="text text_type_main-large pt-10">Соберите бургер</h1>

      {/* Tabs */}
      <div className={`${burgerIngredientsStyles.tabs} pt-5 pb-10`}>
        {
          Object.keys(ingredientsTypes).map((key, index) => {
            const ingredientsType = ingredientsTypes[key as keyof typeof ingredientsTypes];
            return (
              <Tab key = {index}
                   value = {ingredientsType}
                   active = {current === ingredientsType}
                   onClick = {() => [scrollToHeading(key), setCurrent(ingredientsType)]}>{ingredientsType}
              </Tab>
            );
          })
        }
      </div>

      {/* Ingredients area */}
      <section className={`${burgerIngredientsStyles.area} ingredientsArea custom-scroll`}
               onScroll={() => changeActiveTab(ingredientsGroups as NodeListOf<Element>)}>
        {
          Object.keys(ingredientsTypes).map((key, index) => {
            const ingredientsType = ingredientsTypes[key as keyof typeof ingredientsTypes];
            const group = ingredients.filter((item) => item.type === key);
            return (
              <IngredientsGroup key = {index}
                                groupId = {key}
                                groupName = {ingredientsType}
                                group = {group} />
            );
          })
        }
      </section>

    </section>
  );
}

export default BurgerIngredients;
