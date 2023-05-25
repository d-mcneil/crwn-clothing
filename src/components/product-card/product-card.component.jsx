import Button from "../button/button.component";
import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
  const { name, imageUrl, price } = product;

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name}></img>
      <div className="product-card-footer">
        <span className="product-name">{name}</span>
        <span className="product-price">{price}</span>
      </div>
      <Button buttonType="inverted" buttonAttributes={{ type: "button" }}>
        ADD TO CART
      </Button>
    </div>
  );
};

export default ProductCard;
