import Theme from './Theme';
import { BrowserRouter } from "react-router-dom";
import Routing from './Routes';
import SideMenu from './Components/SideMenu';
function App(props) {
  return <BrowserRouter>
    <Theme>
      <SideMenu>
        <Routing />
      </SideMenu>
    </Theme>
  </BrowserRouter>;
}

export default App;
