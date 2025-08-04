interface Fieldset extends React.ComponentProps<"fieldset"> {}

const Fieldset = ({ children, ...props }: Fieldset) => {
  return (
    <fieldset className="grid space-y-1" {...props}>
      {children}
    </fieldset>
  );
};

export default Fieldset;
