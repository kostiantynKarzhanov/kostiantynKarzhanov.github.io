import Image from "./Image";
import Checkbox from "./Checkbox";

const Card = ({ cardWidth, srcUrl, checkboxValue }) => {
  const styleObj = {
    maxWidth: `${cardWidth}%`,
    flex: `0 0 ${cardWidth}%`,
  };

  return (
    <div style={styleObj} className="card">
      <Image srcUrl={srcUrl} altText="alt text" />
      <Checkbox classValue="sr-only" checkboxValue={checkboxValue} />
    </div>
  );
};

export default Card;
