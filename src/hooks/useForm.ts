import { useState, ChangeEvent } from "react";

interface InputValues {
    [key: string]: string;
}

export function useForm<Values extends InputValues>(inputValues: Values) {
    const [values, setValues] = useState<Values>(inputValues);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { value, name } = event.target;
        setValues({ ...values, [name]: value });
    };
    return { values, handleChange, setValues };
}