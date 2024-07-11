import "./App.scss";
import Clock from "./components/Clock";
import Footer from "./components/Footer";
import Message from "./components/Message";
import Socials from "./components/Socials";

function App() {
  return (
    <div id="app">
      <Message message="We're launching soon" />
      <Clock />
      <Socials />
      <Footer />
    </div>
  );
}

export default App;
