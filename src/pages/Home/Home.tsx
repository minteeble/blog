import React, { useEffect, useState } from "react";
import { Button } from "@minteeble/ui-components";
import { TestComponent } from "../../components";

const Home = () => {
  return (
    <div className="home-page">
      Minteeble test 02 <Button text="ddd" />
      <TestComponent />
    </div>
  );
};

export default Home;
