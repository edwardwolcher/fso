import React, { useState, useImperativeHandle } from "react";

const ToggleField = React.forwardRef(
  ({ buttonLabel = "show", cancelLabel = "cancel", ...props }, ref) => {
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
        <div>
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
  }
);
export default ToggleField;
