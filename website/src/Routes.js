import {
    Routes,
    Route,
} from "react-router-dom";
import Home from "./Pages/ViewPages/Home";
import LoginPage from "./Pages/memberPage/LoginPage";
import PrivacyPolicy from "./Pages/Legal/PrivacyPolicy";
import TermCondition from "./Pages/Legal/TermConditions";
import Refund from "./Pages/Legal/Refund";
import Cookies from "./Pages/Legal/Cookies";
import Tournaments from "./Pages/ViewPages/Tournaments";
import Store from './Pages/ViewPages/Store';
import Toc from "./Pages/ViewPages/TOC";
import About from "./Pages/ViewPages/About";
import RulesInfo from "./Pages/ViewPages/RulesInfo";
import Profile from "./Pages/memberPage/Profile";
import SetPasswordFrom from "./Components/Forms/SetPasswordFrom";

const Routing = (props) => {
    return <Routes>
        {/* viewPages  */}
        <Route path="/" element={<Home
            tournaments={props.tournaments}
            setTournaments={props.setTournaments}
            products={props.products}
            setProducts={props.setProducts}
            registrations={props.registrations}
            setRegistration={props.setRegistration}
            user={props.user}
            setUser={props.setUser}
            userRegistrations={props.userRegistrations}
            setUserRegistrations={props.setUserRegistrations}
            stock={props.stock}
            setStock={props.setStock}
            setCart={props.setCart}
        />} />
        <Route path="/tournaments" element={<Tournaments
            tournaments={props.tournaments}
            setTournaments={props.setTournaments}
            registrations={props.registrations}
            setRegistration={props.setRegistration}
            user={props.user}
            setUser={props.setUser}
        />} />
        <Route path='/store' element={<Store 
            stock={props.stock}
            setStock={props.setStock}
            products={props.products}
            setProducts={props.setProducts}
            categories={props.categories}
            setCategories={props.setCategories}
            setCart={props.setCart}
            cart={props.cart}
        />} />
        <Route path='/tournament-of-champions' element={
            <Toc toc={props.toc}
                setToc={props.setToc} 
            />
        } />
        <Route path='/about-us' element={<About 
            team={props.team}
            setTeam={props.setTeam}
            donations={props.donations}
            setDonations={props.setDonations}
        />} />
        <Route path='rules-info' element={<RulesInfo 
            faq={props.faq}
            setFaq={props.setFaq}
            docs={props.docs}
            setDocs={props.setDocs}
        />} />
        {/* memberPages  */}
        <Route path="/login" element={<LoginPage
            user={props.user}
            setUser={props.setUser}

        />} />
        <Route path="/reset/:token" element={<SetPasswordFrom 
        />} />
        <Route path='/account' element={<Profile 
            user={props.user}
            setUser={props.setUser}
            userOrders={props.userOrders}
            setUserOrders={props.setUserOrders}
            registrations={props.userRegistrations}
            setRegistration={props.setUserRegistrations}
            payments={props.payments}
        />} />
        {/* legal routes  */}
        <Route path="/privacy-policies" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermCondition />} />
        <Route path="/refunds-returns" element={<Refund />} />
        <Route path="/cookies" element={<Cookies />} />
    </Routes>
}

export default Routing;




// useable props ***********************************************
// registrations = { props.registrations }
// setRegistration = { props.setRegistration }
// user = { props.user }
// setUser = { props.setUser }
// cart = { props.cart }
// setCart = { props.setCart }
// tournaments = { props.tournaments }
// setTournaments = { props.setTournaments }
// products = { props.products }
// setProducts = { props.setProducts }
// userRegistrations = { props.userRegistrations }
// setUserRegistrations = { props.setUserRegistrations }
// userOrders = { props.userOrders }
// setUserOrders = { props.setUserOrders }
// stock = { props.stock }
// setStock = { props.setStock }