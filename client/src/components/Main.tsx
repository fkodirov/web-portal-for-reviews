import React from "react";
import Card from "./Card";
const Main: React.FC = () => {
  return (
    <main className="container">
      <div className="row gap-3 p-4 justify-content-center">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </main>
  );
};

export default Main;
