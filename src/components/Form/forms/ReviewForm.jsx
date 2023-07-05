import formData from "../../../assets/data/form.json";
import useFormState from "../../../hooks/useFormState";
import {renderTags} from "../utils";

const ReviewForm = ({
    fields,
    btnText,
    cb = () => {}
}) => {
    const data = formData.review;
    const states = useFormState("review")();

    const formHandler = (e) => {
        e.preventDefault();
        const body = {};
        fields.forEach(el => {
            body[el] = states[el][0];
        })
        cb(body);
    }

    return <form onSubmit={formHandler} className="form form_product">
        {renderTags(fields, data, states)}
        <button
            type="submit"
            className="form__btn"
        >{btnText}</button>
    </form>
}

export default ReviewForm;