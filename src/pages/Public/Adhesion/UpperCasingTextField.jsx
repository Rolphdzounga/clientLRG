import * as React from 'react';
import {fieldToTextField} from 'formik-mui';

import MuiTextField from '@mui/material/TextField';

export function UpperCasingTextField(props) {
  const {
    form: {setFieldValue},
    field: {name},
  } = props;
  const onChange = React.useCallback(
    (event) => {
      const {value} = event.target;
      setFieldValue(name, value ? value.toUpperCase() : '');
    },
    [setFieldValue, name]
  );
  return <MuiTextField {...fieldToTextField(props)} onChange={onChange} />;
}

export const MonTextField = (props)=> {
  const {
    form: {setFieldValue},
    field: {name},
  } = props;
  const onChange = React.useCallback(
    (event) => {
      const {value} = event.target;
      setFieldValue(name, value);
    },
    [setFieldValue, name]
  );
  return <MuiTextField {...fieldToTextField(props)} onChange={onChange} />;
}
