import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';
import { useEffect, useState, useCallback } from 'react';

import useHttp from '../../hooks/use-http'

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const { error, loading, fetchData } = useHttp();

  const catchingData = useCallback((data) => {
    const updatedData = Object.entries(data).map(el => {
      return { id: el[0], name: el[1].name, description: el[1].description, price: el[1].price }
    })
    setMeals(prevState => prevState.concat(updatedData))
  }, [])

  useEffect(() => {
    fetchData({ url: 'https://react-training-dummy-data-default-rtdb.firebaseio.com/meals.json' }, catchingData);
  }, [fetchData, catchingData])

  const mealsList = loading ? <p>LOADING</p> : meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{error ? <p>{error}</p> : mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
