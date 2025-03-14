import React, { useState, useEffect } from "react";
import Carousel from "./components/Carousel";
import Button from "./components/Button";

const App = () => {
  const fetchData = async () => {
    const request = await fetch("https://reqres.in/api/users/");
    const response = await request.json();
    const data = response.data;
    const dataArr = data.map(({ avatar, email }) => {
      return {
        avatar,
        email,
      };
    });
    setData(dataArr);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [dataArr, setData] = useState([]);
  const [x, setX] = useState(0);
  const [count, setCount] = useState(0);
  const [selectedArr, setSelectedArr] = useState([]);

  const slideStep = 3;
  const numVisibleCards = 3;
  const cardWidth = 100 / numVisibleCards;
  const endPoint = (dataArr.length - numVisibleCards) / slideStep;

  const handleCardClick = (target) => {
    const image = [...target.children].find((item) => item.tagName === "IMG");
    const checkbox = [...target.children].find(
      (item) => item.tagName === "INPUT"
    );

    if (!image || !checkbox) return;

    image.classList.toggle("selected");
    checkbox.checked = !checkbox.checked;

    if (checkbox.checked) {
      setSelectedArr((prev) => prev.concat(checkbox.value));
    } else {
      setSelectedArr((prev) => {
        const position = prev.indexOf(checkbox.value);
        return prev.toSpliced(position, 1);
      });
    }
  };

  // ---------------
  // looping slider
  // ---------------
  const handleBtnClick = (target) => {
    if (target.classList.contains("prev")) {
      if (count <= 0) {
        setX(() => endPoint * slideStep * -1);
        setCount(() => endPoint);
      } else {
        setX((prev) => prev + (count < 1 ? slideStep * count : slideStep));
        setCount((prev) => prev - (count < 1 ? count : 1));
      }
    } else if (target.classList.contains("next")) {
      if (count >= endPoint) {
        setX(() => 0);
        setCount(() => 0);
      } else {
        setX(
          (prev) =>
            prev -
            (endPoint - count < 1 ? slideStep * (endPoint - count) : slideStep)
        );

        setCount(
          (prev) => prev + (endPoint - count < 1 ? endPoint - count : 1)
        );
      }
    }
  };

  // // -------------------
  // // Non-looping slider
  // // -------------------
  // const handleBtnClick = (target) => {
  //   if (target.classList.contains("prev") && count > 0) {
  //     setX((prev) => prev + (count < 1 ? slideStep * count : slideStep));
  //     setCount((prev) => prev - (count < 1 ? count : 1));
  //   } else if (target.classList.contains("next") && count < endPoint) {
  //     setX(
  //       (prev) =>
  //         prev -
  //         (endPoint - count < 1 ? slideStep * (endPoint - count) : slideStep)
  //     );

  //     setCount((prev) => prev + (endPoint - count < 1 ? endPoint - count : 1));
  //   }
  // };

  const handleClickCarousel = (event) => {
    const target = event.target.closest(".card, .btn-carousel");
    if (!target) return;

    if (target.classList.contains("card")) {
      handleCardClick(target);
    } else if (target.classList.contains("btn-carousel")) {
      handleBtnClick(target);
    }
  };

  return (
    <>
      <Carousel
        onClick={(event) => {
          handleClickCarousel(event);
        }}
        xPosition={x}
        cardWidth={cardWidth}
        data={dataArr}
      />
      <Button
        onClick={() => {
          console.log(selectedArr);
        }}
        classValue="btn-generate-list"
        value="generate"
      />
    </>
  );
};

export default App;
