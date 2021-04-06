import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const ToggleFieldForward = (
  { buttonLabel, cancelLabel = "cancel", ...props },
  ref
) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    };
  });

  if (!visible)
    return (
      <div className="toggle-field">
        <button className="toggle-button" onClick={toggleVisibility}>
          {buttonLabel}
        </button>
      </div>
    );

  return (
    <div className="toggle-field">
      {props.children}
      <button className="toggle-button" onClick={toggleVisibility}>
        {cancelLabel}
      </button>
    </div>
  );
};

const ToggleField = React.forwardRef(ToggleFieldForward);

ToggleField.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
export default ToggleField;
