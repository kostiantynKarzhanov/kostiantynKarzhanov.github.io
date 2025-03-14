import React from "react";
import Button from "./Button";
import BoxCards from "./BoxCards";
import "./css/_carousel.css";

const Carousel = ({ onClick, xPosition, cardWidth, data }) => {
  return (
    <div onClick={onClick} className="carousel">
      <Button classValue="btn-carousel prev" value="prev" />
      <BoxCards xPosition={xPosition} cardWidth={cardWidth} data={data} />
      <Button classValue="btn-carousel next" value="next" />
    </div>
  );
};

export default Carousel;
