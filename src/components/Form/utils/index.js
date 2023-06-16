import {
    Textarea,
    Select,
    Image,
    Password,
    Input,
    Switch,
    Tag
} from "../";

export const renderTags = (
    fields,
    data,
    states,
    comparePwd = false,
    setSimilarPwd = () => {}
) => {
    return fields.map(el => {
        const elData = data[el];
        switch (elData.format) {
            case "textarea":
                return <Textarea key={el} name={el} {...elData} state={states[el]}/>
            case "select":
                return <Select key={el} name={el} {...elData} state={states[el]}/>
            case "image":
                return <Image key={el} name={el} {...elData} state={states[el]} />
            case "tag":
                return <Tag key={el} name={el} {...elData} state={states[el]} />
            case "switch":
                return <Switch key={el} name={el} {...elData} state={states[el]} />
            case "password":
                return <Password key={el} name={el} {...elData} state={states[el]} compare={comparePwd} setSimilar={setSimilarPwd}/>
            default:
                return <Input key={el} name={el} {...elData} state={states[el]} />
        }
    })
}