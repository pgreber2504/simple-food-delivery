import React from 'react'
import classes from './ErrorMessage.module.css';

const ErrorMessage = (props) => {
    return (
        <div className={classes['error-message']}>
            <h2>Something went wrong!</h2>
            <h3>At the moment, We cannot send Your order</h3>
            <p className={classes['error-message__status']}>{props.message}</p>
            <p className={classes['error-message__action']} onClick={props.closeModal}>Try again later!</p>
        </div>
    )
}

export default ErrorMessage