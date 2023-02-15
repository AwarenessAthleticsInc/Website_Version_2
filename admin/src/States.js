import App from "./App";
import { useState, useEffect } from "react";
import $ from 'jquery';

const States = () => {
    const development = true;
    const [theme, setTheme] = useState('light');
    const [started, setStarted] = useState(false);
    const [userList, setUserList] = useState([]);
    const [user, setUser] = useState(false);
    const [cart, setCart] = useState(false);
    const [orders, setOrder] = useState([]);
    const [tournaments, setTournaments] = useState([]);
    const [registrations, setRegistration] = useState([]);
    const [products, setProducts] = useState([]);
    const [userRegistrations, setUserRegistrations] = useState([]);
    const [userOrders, setUserOrders] = useState([]);
    const [stock, setStock] = useState([]);
    const [categories, setCategories] = useState([]);
    const [toc, setToc] = useState([]);
    const [team, setTeam] = useState([]);
    const [softballTeams, setSoftballTeams] = useState([]);
    const [docs, setDocs] = useState([]);
    const [faq, setFaq] = useState([]);
    const [payments, setPayments] = useState([]);
    const startApp = () => {
        if (!started) {
            $.ajax({
                type: "GET",
                url: "/api/startup",
                success: (data) => {
                    setUser(data.currentUser.userData);
                    setCart(data.currentCart.cartData);
                    setTournaments(data.currentTournament.tournamentData);
                    setProducts(data.currentProduct.productData);
                    setRegistration(data.currentRegistrations.RegistrationData);
                    setStock(data.currentStock.stockData);
                    setCategories(data.currentCategories.categoryData);
                    setToc(data.currentToc.tocData);
                    setTeam(data.currentTeam.teamData);
                    setSoftballTeams(data.currentSoftballTeams.Data);
                    setDocs(data.currentDocs.docData);
                    setFaq(data.currentFaq.faqData);
                    setOrder(data.currentOrders.orderData);
                    setUserList(data.allUsers.userData);
                    setPayments(data.payments);
                    setStarted(true);
                }
            });
        }

    }
    // eslint-disable-next-line
    useEffect(() => {
        startApp();
        if (user) {
            $.ajax({
                type: "POST",
                url: "/api/user",
                data: user,
                success: (data) => {
                    setUserOrders(data.orderData);
                    setUserRegistrations(data.registrationData);
                }
            });
        } else {
            setUserOrders(false);
            setUserRegistrations(false);
        }
        // eslint-disable-next-line
    }, [user]);


    return <App
        development={development}
        theme={theme}
        setTheme={setTheme}
        user={user}
        setUser={setUser}
        cart={cart}
        setCart={setCart}
        tournaments={tournaments}
        setTournaments={setTournaments}
        registrations={registrations}
        setRegistration={setRegistration}
        products={products}
        setProducts={setProducts}
        userRegistrations={userRegistrations}
        setUserRegistrations={setUserRegistrations}
        userOrders={userOrders}
        setUserOrders={setUserOrders}
        stock={stock}
        setStock={setStock}
        categories={categories}
        setCategories={setCategories}
        toc={toc}
        setToc={setToc}
        team={team}
        setTeam={setTeam}
        faq={faq}
        setFaq={setFaq}
        docs={docs}
        setDocs={setDocs}
        userList={userList}
        setUserList={setUserList}
        orders={orders}
        setOrders={setOrder}
        softballTeams={softballTeams}
        setSoftballTeams={setSoftballTeams}
        payments={payments}
        setPayments={setPayments}
    />
}
export default States;