import { useState } from "react"


const useInput = (validate) => {
    const [inputValue, setInputValue] = useState('');
    const [touchedInput, setTouchedInput] = useState(false);

    const isValid = validate(inputValue);
    const hasError = !isValid && touchedInput;

    const changeValueHandler = (e = '') => {
        setInputValue(e.target.value)
    }

    const blurHandler = () => {
        setTouchedInput(true)
    }


    return { inputValue, isValid, hasError, changeValueHandler, blurHandler }
}

export default useInput