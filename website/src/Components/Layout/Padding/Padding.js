const Padding = (props) => {
    
    var width = window.innerWidth > 0 && window.innerWidth;
    return width > 991 ? 
        <div style={{ padding: props.desktopPadding }}>{props.children}</div> :
        <div style={{ padding: props.mobilePadding }}>{props.children}</div>
}
export default Padding;