import LinkButton from "../UI/Buttons/LinkButton"
import InstagramIcon from '@mui/icons-material/Instagram';
const InstagramButton = () => {
    return <LinkButton title="Instagram" type="external" url="https://www.instagram.com/slopitchforawareness/">
        <InstagramIcon color="action" />
    </LinkButton>
}
export default InstagramButton;