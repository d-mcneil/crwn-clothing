import "./button.styles.scss";

const Button = ({ children, buttonType = "", buttonAttributes }) => {
  const BUTTON_TYPE_CLASSES = {
    google: "google-sign-in-button",
    inverted: "inverted-button",
  };

  return (
    <button
      {...buttonAttributes}
      className={`${
        buttonType ? BUTTON_TYPE_CLASSES[buttonType] : ""
      } button-container`}
    >
      {children}
    </button>
  );
};

export default Button;
