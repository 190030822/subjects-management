const InputElement = ({type, name, value, onChange}) => {
    return <div>
        <label htmlFor = {name}>{name} : </label> 
        <input type = {type} id = {name} name = {name} value = {value} onChange={onChange} />
    </div>
}

export default InputElement;