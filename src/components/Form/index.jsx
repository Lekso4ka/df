import Input from "./Input";
import Select from "./Select";
import Search from "./Search";
import Textarea from "./Textarea";

import formData from "../../assets/data/form.json";
import "./index.css";

// TODO: Добавить компонент с checkbox
// TODO: Добавить компонент с тегами
// TODO: Добавить компонент с изображением
const Form = () => {
    // const type = "user"
    // const names = ["email", "name", "about", "password", "password-accept"];
    const type = "product";
    const names = ["name", "price", "discount", "description"];
    return <form>
        {names.map(el => {
            const elData = formData[type][el];
            switch (elData.format) {
                case "textarea":
                    return <Textarea key={el} name={el} {...elData}/>
                case "select":
                    return <Select key={el} name={el} {...elData}/>
                default:
                    return <Input key={el} name={el} {...elData}/>
            }
        })}
        <button type="submit">Отправить</button>
    </form>
}

export {Input, Search, Textarea, Select};

export default Form;