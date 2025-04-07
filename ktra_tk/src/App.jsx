import { useState } from "react";

import "./App.css";
import Menu from './components/Menu'; 
import Header from './components/Header'; 
import Content from './components/Contents'; 
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <Menu /> {/* Use the Menu component here */}

        {/* Main Content */}
        <div className="flex-1">
          <Header /> {/* Use the Header component here */}
          <Content /> {/* Use the Content component here */}
        </div>
      </div>
    </>
  );
}

export default App;
