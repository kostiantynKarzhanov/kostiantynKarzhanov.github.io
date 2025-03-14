import React from "react";
import Card from "./Card";

const BoxCards = ({ xPosition, cardWidth, data }) => {
  const styleObj = {
    transform: `translateX(${
      (Math.abs(xPosition) < 0.0001 ? 0 : xPosition) * cardWidth
    }%)`,
  };

  return (
    <div style={styleObj} className="box--cards">
      {data.map((item, index) => {
        return (
          <Card
            key={index}
            cardWidth={cardWidth}
            srcUrl={item.avatar}
            checkboxValue={item.email}
          />
        );
      })}
    </div>
  );
};

export default BoxCards;
