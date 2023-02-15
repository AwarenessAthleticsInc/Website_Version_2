import React, { useEffect } from 'react';
import { BrowserRouter } from "react-router-dom";
import Routes from './Routes';
import Theme from "./Theme";
import Footer from './Pages/Partials/Footer';
import CookieBanner from "./Pages/Legal/CookieBanner";
import AppBar from "./Components/Navbar/AppBar";
import { Box } from '@mui/material';
import SpeedDialContact from './Components/Footer/SpeedDialContact';


function App(props) {
  // console.log(props);
  return (
    <BrowserRouter>
      <Theme>
        <Box sx={{ paddingBottom: { xs: '5rem', md: '0' } }}>
          <AppBar registrations={props.registrations}
            user={props.user}
            cart={props.cart}
            setUser={props.setUser}
            setCart={props.setCart}
            stock={props.stock}
          />
          <Routes
            registrations={props.registrations}
            setRegistration={props.setRegistration}
            user={props.user}
            setUser={props.setUser}
            cart={props.cart}
            setCart={props.setCart}
            tournaments={props.tournaments}
            setTournaments={props.setTournaments}
            products={props.products}
            setProducts={props.setProducts}
            userRegistrations={props.userRegistrations}
            setUserRegistrations={props.setUserRegistrations}
            userOrders={props.userOrders}
            setUserOrders={props.setUserOrders}
            stock={props.stock}
            setStock={props.setStock}
            categories={props.categories}
            setCategories={props.setCategories}
            toc={props.toc}
            setToc={props.setToc}
            team={props.team}
            setTeam={props.setTeam}
            faq={props.faq}
            setFaq={props.setFaq}
            docs={props.docs}
            setDocs={props.setDocs}
            donations={props.donations}
            setDonations={props.setDonations}
            payments={props.payments}
          />
          <SpeedDialContact />
          <Footer user={props.user}
            userOrders={props.userOrders}
            setUserOrders={props.setUserOrders}
            registrations={props.userRegistrations}
            payments={props.payments}
          />
          <CookieBanner user={props.user} />
        </Box>
      </Theme>
    </BrowserRouter>


  );
}

export default App;
