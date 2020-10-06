import React from "react";

//import  * as cad  from "./styles";
import { IProps } from "./types";

/**
 * Radio input.
 */
const Radio: React.FC<IProps> = ({
  checked,
  children,
  customLabel = false,
  ...props
}: IProps) => {
  //const StyledInput = customLabel ? cad.Input : cad.LabeledInput;
  
  return (<div></div>
   /* <StyledInput checked={checked || false}>
      <input type="radio" checked={checked} {...props} />{" "}
      <div>
        <span />
      </div>
      {children}
    </StyledInput>*/
  );
};

export { Radio };
