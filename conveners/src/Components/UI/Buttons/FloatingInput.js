const FloatingInput = (props) => {
    const change = (event) => {
        const type = event.target.attributes["type"].nodeValue;
        const classes = event.target.attributes["class"].nodeValue;
        if(type === "tel") {
            var cleaned = ('' + event.target.value).replace(/\D/g, '')
            var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
            if (match) {
                event.target.value = match[1] + '-' + match[2] + '-' + match[3]
            }
        }
        const index = classes.split(" ").indexOf("name");
        if(index > -1) {
            var name = event.target.value;
            name = name.toLowerCase().replace(/\b[a-z]/g, function (letter) {
                return letter.toUpperCase();
            });
            event.target.value = name;
        }
        props.onChange(event);
    }

    return <div class="form-floating">
        <input onChange={change} onKeyDown={props.onKeyDown} type={props.type} className={`${props.classes} form-control`}  autocomplete={props.autocomplete} id={props.id} placeholder="placeholder" />
        <label for={props.id} >{props.label}</label>
    </div>
}
export default FloatingInput;