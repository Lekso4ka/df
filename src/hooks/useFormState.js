import {useState} from "react";

const useUserState = () => {
    const name = useState("");
    const about = useState("");
    const avatar = useState("");
    const email = useState("");
    const password = useState("");
    const passwordAccept = useState("");
    const token = useState("");
    return {
        name,
        about,
        avatar,
        email,
        password,
        passwordAccept,
        token
    }
}

const useProductState = () => {
    const name = useState("");
    const price = useState(1);
    const discount = useState(0);
    const stock = useState(1);
    const isPublished = useState(false);
    const wight = useState("");
    const description = useState("Тут скоро появится описание");
    const pictures = useState("");
    const tag = useState("");
    return {
        name,
        price,
        discount,
        stock,
        isPublished,
        wight,
        description,
        pictures,
        tag
    }
}

const useReviewState = () => {
    const rating = useState(0);
    const text = useState("");
    const name = useState("Отзыв о товаре");
    const city = useState("DogLand");
    return {
        rating,
        text,
        name,
        city
    }
}

const useFormState = (type) => {
    switch (type) {
        case "user": return useUserState;
        case "product": return useProductState;
        case "review": return useReviewState;
        default: return {};
    }
}

export {useUserState, useProductState, useReviewState};

export default useFormState;