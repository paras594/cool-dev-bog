import React from "react";

const InputErrorLabel = ({ errorMsg }) => {
  return (
    <div className="label">
      <p className="label-text-alt text-red-500">{errorMsg}</p>
    </div>
  );
};

export default InputErrorLabel;
