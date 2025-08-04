import React from "react";

interface Label extends React.ComponentProps<"label"> {
  htmlFor: string;
  text: string;
}

const Label = ({ htmlFor, text, ...props }: Label) => {
  return (
    <label htmlFor={htmlFor} {...props} className="font-medium">
      {text}
    </label>
  );
};

export default Label;
