import Input from "./Input";
import Select from "./Select";
import Search from "./Search";
import Textarea from "./Textarea";

import formData from "../../assets/data/form.json";
import useFormState from "../../hooks/useFormState";
import "./index.css";

// TODO: Добавить компонент с checkbox
// TODO: Добавить компонент с тегами
// TODO: Добавить компонент с изображением
// TODO: Компонент для проверки пароля
const Form = () => {
    // const type = "user"
    // const names = ["email", "name", "about", "password", "passwordAccept"];
    const type = "product";
    const names = ["name", "price", "discount", "description"];
    const states = useFormState(type)();
    console.log(states);

    const formHandler = (e) => {
        e.preventDefault();
        const body = {};
        names.forEach(el => {
            body[el] = states[el][0];
        })
        console.log(body);
    }
    return <form onSubmit={formHandler}>
        {names.map(el => {
            const elData = formData[type][el];
            switch (elData.format) {
                case "textarea":
                    return <Textarea key={el} name={el} {...elData} state={states[el]}/>
                case "select":
                    return <Select key={el} name={el} {...elData} state={states[el]}/>
                default:
                    return <Input key={el} name={el} {...elData} state={states[el]} />
            }
        })}
        <button type="submit">Отправить</button>
    </form>
}

export {Input, Search, Textarea, Select};

export default Form;