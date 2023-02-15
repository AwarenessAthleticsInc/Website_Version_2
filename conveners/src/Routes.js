import {
    Routes,
    Route,
} from "react-router-dom";
import Overview from "./Pages/ViewPages/Overview";

const Routing = (props) => {
    return <Routes>
        <Route path="/conveners/home/:token" element={<Overview 
        />} />
    </Routes>
}
export default Routing;