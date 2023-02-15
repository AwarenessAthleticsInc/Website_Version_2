import LinkButton from "../UI/Buttons/LinkButton"
import FacebookIcon from '@mui/icons-material/Facebook';
const FacebookButton = () => {
    return <LinkButton title="Facebook" type="external" url="https://www.facebook.com/SPFACanada">
     <FacebookIcon color="action"/>
  </LinkButton>
}
export default FacebookButton;