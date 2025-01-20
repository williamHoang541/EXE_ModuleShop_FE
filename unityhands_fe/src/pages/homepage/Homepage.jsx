import Area from '../../components/area/Area';
import Introduction from '../../components/introduction/Introduction';
import './Homepage.scss';
import Header from '../../components/header/Header';

function Homepage() {
  return (
    <>
    <Header />
    <Introduction />
    <Area />
    <div className="homepage">
      <h1 className="homepage-header">Welcome to My Homepage!</h1>
      <button className="homepage-button">Click Me</button>
    </div>
    </>
  );
}

export default Homepage;
