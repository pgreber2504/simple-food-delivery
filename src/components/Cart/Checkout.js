import { useContext } from 'react';

import classes from './Checkout.module.css';
import useInput from '../../hooks/use-input';
import useHttp from '../../hooks/use-http';
import CartContext from '../../store/cart-context';

const Checkout = (props) => {

    const cartCtx = useContext(CartContext);
    const { inputValue: nameValue, isValid: nameIsValid, hasError: nameHasError, changeValueHandler: changeNameHandler, blurHandler: blurNameHandler } = useInput((inputValue) => inputValue.trim() !== '');
    const { inputValue: lastNameValue, isValid: lastNameIsValid, hasError: lastNameHasError, changeValueHandler: changeLastNameHandler, blurHandler: blurLastNameHandler } = useInput((inputValue) => inputValue.trim() !== '')
    const { inputValue: postalValue, isValid: postalIsValid, hasError: postalHasError, changeValueHandler: changePostalHandler, blurHandler: blurPostalHandler } = useInput((inputValue) => inputValue.trim() !== '')
    const { inputValue: cityValue, isValid: cityIsValid, hasError: cityHasError, changeValueHandler: changeCityHandler, blurHandler: blurCityHandler } = useInput((inputValue) => inputValue.trim() !== '')
    const { error, loading, fetchData } = useHttp();

    const formIsValid = nameIsValid && lastNameIsValid && postalIsValid && cityIsValid;

    const invalidClass = `${classes.control} ${classes.invalid}`;

    const confirmHandler = (event) => {
        event.preventDefault();
        if (!formIsValid) {
            return
        }

        const mealObj = cartCtx.items.map(el => {
            const mealName = el.name
            return { meal: mealName, amount: el.amount, priceForOne: el.price }
        })

        const sendedObject = {
            name: nameValue,
            lastName: lastNameValue,
            postalCode: postalValue,
            city: cityValue,
            meals: mealObj,
            totalPrice: cartCtx.totalAmount
        }

        fetchData({ url: 'https://react-training-dummy-data-default-rtdb.firebaseio.com/clients.json', method: 'POST', body: sendedObject }, (data) => {
            const id = data.name
            console.log(id);

        })

    };


    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameHasError ? invalidClass : classes.control}>
                <label htmlFor='name'>Your Name</label>
                <input value={nameValue} onChange={changeNameHandler} onBlur={blurNameHandler} type='text' id='name' />
            </div>
            <div className={lastNameHasError ? invalidClass : classes.control}>
                <label htmlFor='street'>Street</label>
                <input value={lastNameValue} onChange={changeLastNameHandler} onBlur={blurLastNameHandler} type='text' id='street' />
            </div>
            <div className={postalHasError ? invalidClass : classes.control}>
                <label htmlFor='postal'>Postal Code</label>
                <input value={postalValue} onChange={changePostalHandler} onBlur={blurPostalHandler} type='text' id='postal' />
            </div>
            <div className={cityHasError ? invalidClass : classes.control}>
                <label htmlFor='city'>City</label>
                <input value={cityValue} onChange={changeCityHandler} onBlur={blurCityHandler} type='text' id='city' />
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button disabled={!formIsValid} className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;