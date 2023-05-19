import "./form-input.styles.scss";

const FormInput = ({ label = "", inputAttributes }) => {
  return (
    <div className="form-input-group">
      <input className="form-input" {...inputAttributes}></input>

      {label && (
        <label
          className={`${
            inputAttributes.value.length ? "shrink" : ""
          } form-input-label`}
          htmlFor={inputAttributes.id && inputAttributes.id}
        >
          {label}
        </label>
      )}
    </div>
  );
};

// Another way of doing the FormInput component which is less explicit within the component about the attributes that are being passed.
// const FormInput = ({ label = "", id = undefined, ...inputAttributes }) => {
//     return (
//       <div className="form-input-group">
//
//         <input className="form-input" id={id} {...inputAttributes}></input>
//         {label && (
//           <label
//             className={`${
//               inputAttributes.value.length ? "shrink" : ""
//             } form-input-label`}
//             htmlFor={id}
//           >
//             {label}
//           </label>
//         )}
//       </div>
//     );
//   };

export default FormInput;
