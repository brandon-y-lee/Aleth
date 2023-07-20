import React from 'react';
import { Autocomplete, Checkbox, TextField } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AutocompleteField = ({ id, label, options, value, onChange }) => (
  <Autocomplete
    disablePortal
    multiple
    limitTags={2}
    id={id}
    options={options}
    autoComplete
    autoHighlight
    selectOnFocus
    clearOnBlur
    filterSelectedOptions
    getOptionLabel={(option) => option.label}
    value={value || []}
    onChange={onChange}
    isOptionEqualToValue={(option, value) => option.label === value.label}
    renderOption={(props, option, { selected }) => (
      <li {...props}>
        <Checkbox
          icon={icon}
          checkedIcon={checkedIcon}
          style={{ marginRight: 8 }}
          checked={selected}
        />
        {option.label}
      </li>
    )}
    renderInput={(params) => (
      <TextField {...params} label={label} />
    )}
    sx={{ width: 'auto', mb: '1.5rem' }}
  />
);

export default AutocompleteField;