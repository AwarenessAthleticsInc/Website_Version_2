const CheckBox = (props) => {
    return <div class="form-group form-check">
        <input onClick={props.onClick} type="checkbox" class="form-check-input" id={props.id} />
        <label class="form-check-label" for={props.id}>{props.label}</label>
    </div>
}
export default CheckBox;