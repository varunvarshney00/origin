import Header from "@/components/header";
import Hero from "@/components/hero";
import React from "react";

const App = () => {
  return (
    <div>
      {/* The Header is now positioned absolutely within its parent */}
      <div className="absolute top-0 left-0 w-full z-10">
        <Header />
      </div>

      {/* The Hero component will now take up the full screen, starting from the top */}
      <Hero />
    </div>
  );
};

export default App;
