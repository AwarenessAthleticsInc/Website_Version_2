import App from './App';
import { useState, useEffect, useReducer } from 'react';
import $ from 'jquery';

const GlobalStates = () => {
    const [postedData, setPostedData] = useState(false);
    const [started, setStarted] = useState(false);
    const [user, setUser] = useState(false);
    const [cart, setCart] = useState(false);
    const [tournaments, setTournaments] = useState([]);
    const [registrations, setRegistration] = useState([]);
    const [products, setProducts] = useState([]);
    const [userRegistrations, setUserRegistrations] = useState([]);
    const [userOrders, setUserOrders] = useState([]);
    const [stock, setStock] = useState([]);
    const [categories, setCategories] = useState([]);
    const [toc, setToc] = useState([]);
    const [team, setTeam] = useState([]);
    const [docs, setDocs] = useState([]);
    const [faq, setFaq] = useState([]);
    const [donations, setDonations] = useState('Not Available at this time');
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
                    setDocs(data.currentDocs.docData);
                    setFaq(data.currentFaq.faqData);
                    setDonations(data.donations);
                    setPayments(data.payments);
                    setStarted(true);
                }
            });

        }

    }
    // useEffect(() => {
    //     if (!postedData) {
    //         setPostedData(true);
    //         const data = {
    //             requestId: window.navigator.productSub,
    //             connection: {
    //                 down: window.navigator.connection.downlink,
    //                 effectiveType: window.navigator.connection.effectiveType,
    //                 rtt: window.navigator.connection.rtt
    //             },
    //             language: window.navigator.language,
    //             mobile: window.navigator.userAgentData.mobile,
    //             platform: window.navigator.userAgentData.platform
    //         }
    //         $.ajax({
    //             type: "POST",
    //             url: "/api/startup",
    //             data: data,
    //             success: (response) => {

    //             }
    //         });
    //     }
    // }, []);
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
    }, [user]);

    return <App
        payments={payments}
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
        donations={donations}
        setDonations={setDonations}
    />
}
export default GlobalStates;