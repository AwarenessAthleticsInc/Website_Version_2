const CurrencyConverter = (props) => {
    switch (props.tag) {
        case "h1":
            return <h1>{`$${Number(props.amount).toFixed(2)}`}</h1>
            break;
        case "h2":
            return <h2>{`$${Number(props.amount).toFixed(2)}`}</h2>
            break;
        case "h3":
            return <h3>{`$${Number(props.amount).toFixed(2)}`}</h3>
            break;
        case "h4":
            return <h4>{`$${Number(props.amount).toFixed(2)}`}</h4>
            break;
        case "h5":
            return <h5>{`$${Number(props.amount).toFixed(2)}`}</h5>
            break;
        case "h6":
            return <h6>{`$${Number(props.amount).toFixed(2)}`}</h6>
            break;
        default:
            return <p>{`$${Number(props.amount).toFixed(2)}`}</p>
            break;
    }
}
export default CurrencyConverter;