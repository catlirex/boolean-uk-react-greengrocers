import Header from "./components/Header";
import Main from "./components/Main";
import "./styles/index.css";

/* 
Your store item should have the following structure

{
  id: "001-beetroot", <- the item id matches the icon name in the assets/icons folder
  name: "beetroot",
  price: 0.35 <- You can come up with your own prices
}

*/

export default function App() {
  return <div className="App">
    <Header/>
    <Main/>

    <div>
      Icons made by
      <a href="https://www.flaticon.com/authors/icongeek26" title="Icongeek26"
        >Icongeek26</a
      >
      from
      <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
    </div>
  </div>;
}
