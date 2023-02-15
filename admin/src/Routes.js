import {
    Routes,
    Route,
} from "react-router-dom";
import Overview from "./Pages/ViewPages/Overview";
import Teams from './Pages/ViewPages/Teams';
import Login from "./Pages/MemberPages/Login";
import Registrations from "./Pages/ViewPages/Registrations";
import Tournaments from "./Pages/ViewPages/Tournaments";
import Toc from "./Pages/ViewPages/Toc";
import Orders from "./Pages/ViewPages/Orders";
import Products from "./Pages/ViewPages/Products";
import Stock from "./Pages/ViewPages/Stock";
import Users from "./Pages/ViewPages/Users";
import Faq from "./Pages/ViewPages/Faq";
import RulesInfo from "./Pages/ViewPages/RulesInfo";
import Staff from "./Pages/ViewPages/Staff";

const Routing = (props) => {
    return <Routes>
        <Route path="/dashboard" element={<Overview 
            user={props.user}
            tournaments={props.tournaments}
            registrations={props.registrations}
            products={props.products}
            userRegistrations={props.userRegistrations}
            userOrders={props.userOrders}
            stock={props.stock}
            categories={props.categories}
            toc={props.toc}
            team={props.team}
            faq={props.faq}
            docs={props.docs}
            userList={props.userList}
            orders={props.orders}
            softballTeams={props.softballTeams}
            payments={props.payments}
        />} />
        <Route path="/dashboard/login" element={<Login
            user={props.user}
            setUser={props.setUser}
        />} />
        <Route path="/dashboard/teams" element={<Teams
            team={props.softballTeams}
            setSetSoftballTeams={props.setSoftballTeams}
        />} />
        <Route path="/dashboard/registrations" element={<Registrations
            registrations={props.registrations}
            setRegistration={props.setRegistration}
            payments={props.payments}
            setPayments={props.setPayments}
            tournaments={props.tournaments}
            setTournaments={props.setTournaments}
        />} />
        <Route path="/dashboard/tournaments" element={<Tournaments
            users={props.userList}
            registrations={props.registrations}
            setRegistration={props.setRegistration}
            payments={props.payments}
            setPayments={props.setPayments}
            tournaments={props.tournaments}
            setTournaments={props.setTournaments}
        />} />
        <Route path="/dashboard/toc" element={<Toc
            registrations={props.registrations}
            setRegistration={props.setRegistration}
            toc={props.toc}
            setToc={props.setToc}
            tournaments={props.tournaments}
            development={props.development}
        />} />
        <Route path='/dashboard/orders' element={<Orders 
            orders={props.orders}
            payments={props.payments}
        />} />
        <Route path='/dashboard/products' element={<Products
            products={props.products}
            setProducts={props.setProducts}
            stock={props.stock}
            setStock={props.setStock}
        />} />
        <Route path='/dashboard/stock' element={<Stock
            stock={props.stock}
            setStock={props.setStock}
        />} />
        <Route path='/dashboard/users' element={<Users
            userList={props.userList}
            setUserList={props.setUserList}
        />} />
        <Route path='/dashboard/faq' element={<Faq
            faq={props.faq}
            setFaq={props.setFaq}
        />} />
        <Route path='/dashboard/info' element={<RulesInfo
            docs={props.docs}
            setDocs={props.setDocs}
        />} />
        <Route path='/dashboard/staff' element={<Staff
            team={props.team}
            setTeam={props.setTeam}
        />} />
    </Routes>
}
export default Routing;


// development = { props.development }
// theme = { props.theme }
// setTheme = { props.setTheme }
// user = { props.user }
// setUser = { props.setUser }
// cart = { props.cart }
// setCart = { props.setCart }
// tournaments = { props.tournaments }
// setTournaments = { props.setTournaments }
// registrations = { props.registrations }
// setRegistration = { props.setRegistration }
// products = { props.products }
// setProducts = { props.setProducts }
// userRegistrations = { props.userRegistrations }
// setUserRegistrations = { props.setUserRegistrations }
// userOrders = { props.userOrders }
// setUserOrders = { props.setUserOrders }
// stock = { props.stock }
// setStock = { props.setStock }
// categories = { props.categories }
// setCategories = { props.setCategories }
// toc = { props.toc }
// setToc = { props.setToc }
// team = { props.team }
// setTeam = { props.setTeam }
// faq = { props.faq }
// setFaq = { props.setFaq }
// docs = { props.docs }
// setDocs = { props.setDocs }
// userList = { props.userList }
// setUserList = { props.setUserList }
// orders = { props.orders }
// setOrders = { props.setOrder }
// softballTeams = { props.softballTeams }
// setSoftballTeams = { props.setSoftballTeams }
// payments = { props.payments }
// setPayments = { props.setPayments }