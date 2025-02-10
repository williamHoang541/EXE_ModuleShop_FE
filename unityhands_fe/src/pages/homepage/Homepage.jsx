import Area from "../../components/area/Area";
import Introduction from "../../components/introduction/Introduction";
import "./Homepage.scss";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function Homepage() {
  return (
    <>
      <header>
        <Header />
      </header>
        <Introduction />
        <Area />
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Homepage;
