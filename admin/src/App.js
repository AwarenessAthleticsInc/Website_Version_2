import Theme from './Theme';
import { BrowserRouter } from "react-router-dom";
import Routing from './Routes';
import SideMenu from './Components/SideMenu';
function App(props) {
  return <BrowserRouter>
    <Theme theme={props.theme}
      setTheme={props.setTheme}
    >
      <SideMenu user={props.user}
        setUser={props.setUser}
      >
        <Routing
          development={props.development}
          theme={props.theme}
          setTheme={props.setTheme}
          user={props.user}
          setUser={props.setUser}
          cart={props.cart}
          setCart={props.setCart}
          tournaments={props.tournaments}
          setTournaments={props.setTournaments}
          registrations={props.registrations}
          setRegistration={props.setRegistration}
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
          userList={props.userList}
          setUserList={props.setUserList}
          orders={props.orders}
          setOrders={props.setOrder}
          softballTeams={props.softballTeams}
          setSoftballTeams={props.setSoftballTeams}
          payments={props.payments}
          setPayments={props.setPayments}
        />
      </SideMenu>

    </Theme>
  </BrowserRouter>;
}

export default App;
