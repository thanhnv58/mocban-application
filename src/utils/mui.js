import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import React from "react";
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import * as OrderType from "./../constants/OrderType";
import { getOrderType } from "./../utils/helpers";

export const renderTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}) => (
  <TextField
    label={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return;
  } else {
    return <FormHelperText>{touched && error}</FormHelperText>;
  }
};

export const renderSelectField = ({
  input,
  label,
  meta: { touched, error, invalid },
  children,
  classFormControl,
  ...custom
}) => (
  <FormControl error={touched && invalid} className={classFormControl}>
    <InputLabel id="selected-label">{label}</InputLabel>
    <Select {...input} {...custom} labelId="selected-label">
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
);

export const radioOrderType = ({ input, ...rest }) => {
  let listRadio = [OrderType.DESIGN, OrderType.PRODUCT];

  return (
    <FormControl>
      <RadioGroup {...input} {...rest}>
        {listRadio.map((radio, i) => (
          <FormControlLabel
            key={i}
            value={radio}
            control={<Radio />}
            label={getOrderType(radio)}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
