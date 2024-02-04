import React from "react";

const FormCancelButton = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className="btn btn-outline">
      Cancel
    </button>
  );
};

export default FormCancelButton;
