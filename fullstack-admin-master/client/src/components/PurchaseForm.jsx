import React, { useState, useRef, useEffect } from 'react';
import { 
  Button,
  TextField,
  Box,
  useTheme,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  Divider,
  Autocomplete,
} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useFormik } from 'formik';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const PurchaseForm = ({ onSearch }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  const formik = useFormik({
    initialValues: {
      productCategory: '',
      materialType: '',
      fabricConstruction: '',
      countryOfOrigin: '',
      weightOfFabric: '',
      unitWeight: '',
      color: '',
      patternPrint: '',
      finishing: '',
      quantity: '',
      priceRange: '',
      deliveryDate: '',
      certificationsRequired: '',
    },
    onSubmit: values => {
      console.log(values);
      onSearch(values);
    },
  });

  const handleProductCategoryChange = (event, newValue) => {
    formik.setFieldValue('productCategory', newValue);
  };

  const handleFabricConstructionChange = (event) => {
    const { value } = event.target;
    formik.setFieldValue('fabricConstruction', value);
  };

  const handleMaterialTypeChange = (event) => {
    const { value } = event.target;
    formik.setFieldValue('materialType', value);
  };

  const handleClear = () => {
    formik.resetForm();
  }

  const productCategories = [
    { label: 'Tops' },
    { label: 'Bottoms' },
    { label: 'Dresses' },
    { label: 'Outerwear' },
    { label: 'Undergarments' },
    { label: 'Activewear' },
    { label: 'Swimwear' },
    { label: 'Sleepwear' },
    { label: 'Accessories' },
    { label: 'Footwear' },
  ];

  const materialTypes = [
    { label: 'Cotton' },
    { label: 'Polyester' },
    { label: 'Silk' },
    { label: 'Wool' },
    { label: 'Denim' },
    { label: 'Leather' },
    { label: 'Suede' },
    { label: 'Satin' },
    { label: 'Velvet' },
    { label: 'Linen' },
    { label: 'Rayon' },
    { label: 'Nylon' },
    { label: 'Spandex' },
    { label: 'Lycra' },
    { label: 'Cashmere' },
    { label: 'Chiffon' },
    { label: 'Flannel' },
    { label: 'Gabardine' },
    { label: 'Georgette' },
    { label: 'Jersey' },
    { label: 'Lace' },
    { label: 'Muslin' },
    { label: 'Organza' },
    { label: 'Poplin' },
    { label: 'Tweed' },
    { label: 'Twill' },
    { label: 'Voile' },
    { label: 'Faux Fur' },
    { label: 'Fleece' },
    { label: 'Neoprene' },
    { label: 'Vinyl' },
    { label: 'Hemp' },
    { label: 'Jute' },
    { label: 'Bamboo' },
    { label: 'Modal' },
    { label: 'Tencel' },
    { label: 'Seersucker' },
    { label: 'Brocade' },
    { label: 'Corduroy' },
    { label: 'Damask' },
    { label: 'Khaki' },
    { label: 'Pique' },
    { label: 'Plisse' },
    { label: 'Velour' },
    { label: 'Acrylic' },
    { label: 'Microfiber' },
    { label: 'Polypropylene' },
    { label: 'Gore-Tex' },
    { label: 'Tyvek' },
  ];

  const fabricConstructions = [
    { label: 'Woven' },
    { label: 'Knit' },
    { label: 'Non-Woven' },
    { label: 'Synthetic' },
    { label: 'Blended' }
  ];

  return (
    <form onSubmit={formik.handleSubmit}>
      <Autocomplete
        disablePortal
        id="productCategory"
        options={productCategories}     
        autoComplete
        autoHighlight
        selectOnFocus
        clearOnBlur
        getOptionLabel={(option) => typeof option === 'string' ? option : option.label}
        value={formik.values.productCategory || null}
        onChange={(event, newValue) => {
          formik.setFieldValue('productCategory', newValue ? newValue.label : '');
          console.log(formik.values.productCategory)
        }}
        isOptionEqualToValue={(option, value) => option.label === value}
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
          <TextField {...params} label="Product Category" />
        )}
        sx={{ width: 'auto', mb: '2rem' }}
      />

      <Autocomplete
        disablePortal
        id="materialType"
        options={materialTypes}     
        autoComplete
        autoHighlight
        selectOnFocus
        clearOnBlur
        getOptionLabel={(option) => typeof option === 'string' ? option : option.label}
        value={formik.values.materialType || null}
        onChange={(event, newValue) => {
          formik.setFieldValue('materialType', newValue ? newValue.label : '');
          console.log(formik.values.materialType)
        }}
        isOptionEqualToValue={(option, value) => option.label === value}
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
          <TextField {...params} label="Material Type" />
        )}
        sx={{ width: 'auto', mb: '2rem' }}
      />

      <Autocomplete
        disablePortal
        id="fabricConstruction"
        options={fabricConstructions}     
        autoComplete
        autoHighlight
        selectOnFocus
        clearOnBlur
        getOptionLabel={(option) => typeof option === 'string' ? option : option.label}
        value={formik.values.fabricConstruction || null}
        onChange={(event, newValue) => {
          formik.setFieldValue('fabricConstruction', newValue ? newValue.label : '');
          console.log(formik.values.fabricConstruction)
        }}
        isOptionEqualToValue={(option, value) => option.label === value}
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
          <TextField {...params} label="Fabric Construction" />
        )}
        sx={{ width: 'auto', mb: '2rem' }}
      />

      <TextField
        margin="normal"
        fullWidth
        id="countryOfOrigin"
        label="Country/Region of Origin"
        name="countryOfOrigin"
        onChange={formik.handleChange}
        value={formik.values.countryOfOrigin}
        sx={{
          mb: "1rem",
        }}
      />

      <div style={{ height: '50px', position: 'relative' }}>
        <Accordion 
          expanded={expanded} 
          onChange={() => setExpanded(!expanded)}
          sx={{
            position: expanded ? 'absolute' : 'relative',
            zIndex: expanded ? 'modal' : 'auto',
            backgroundColor: theme.palette.background.paper,
            overflow: 'auto',
            width: expanded ? '100%' : 'auto',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            Advanced Search
          </AccordionSummary>
          <AccordionDetails>
            <Box display="flex" flexDirection="column">
              <TextField
                margin="normal"
                fullWidth
                id="patternPrint"
                label="Pattern/Print"
                name="patternPrint"
                onChange={formik.handleChange}
                value={formik.values.patternPrint}
              />
              <TextField
                margin="normal"
                fullWidth
                id="finishing"
                label="Finishing"
                name="finishing"
                onChange={formik.handleChange}
                value={formik.values.finishing}
              />
              <Box display="flex" justifyContent="space-between">
                <TextField
                  margin="normal"
                  id="weightOfFabric"
                  label="Weight of Fabric"
                  name="weightOfFabric"
                  onChange={formik.handleChange}
                  value={formik.values.weightOfFabric}
                  inputProps={{ step: "0.01", min: "0", max: "100", type: "number" }}
                  style={{ width: '75%' }}
                />
                <Select
                  id="unitWeight"
                  label="Unit"
                  name="unitWeight"
                  value={formik.values.unitWeight}
                  onChange={formik.handleChange}
                  sx={{
                    width: '25%',
                    mt: 2,
                    mb: 2,
                    ml: 1
                  }}
                >
                  <MenuItem value={'GSM'}>Grams per Square Meter</MenuItem>
                  <MenuItem value={'OSY'}>Ounces per Square Yard</MenuItem>
                  <MenuItem value={'OLY'}>Ounces per Linear Yard</MenuItem>
                  <MenuItem value={'D'}>Denier</MenuItem>
                  <MenuItem value={'Tex'}>Tex</MenuItem>
                  <MenuItem value={'Thread Count'}>Thread Count</MenuItem>
                </Select>
              </Box>
              <TextField
                margin="normal"
                fullWidth
                id="quantity"
                label="Quantity"
                name="quantity"
                onChange={formik.handleChange}
                value={formik.values.quantity}
              />
              <Box display="flex" justifyContent="space-between">
                <TextField
                  margin="normal"
                  id="priceRangeLower"
                  label="Price Range Lower"
                  name="priceRangeLower"
                  onChange={formik.handleChange}
                  value={formik.values.priceRangeLower}
                  style={{ width: '45%' }}
                  inputProps={{ step: "0.01", min: "0", max: "10000", type: "number" }}
                />
                <TextField
                  margin="normal"
                  id="priceRangeUpper"
                  label="Price Range Upper"
                  name="priceRangeUpper"
                  onChange={formik.handleChange}
                  value={formik.values.priceRangeUpper}
                  style={{ width: '45%' }}
                  inputProps={{ step: "0.01", min: "0", max: "10000", type: "number" }}
                />
              </Box>
              <TextField
                margin="normal"
                fullWidth
                id="deliveryDate"
                label="Delivery Date"
                name="deliveryDate"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.deliveryDate}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                id="certificationsRequired"
                label="Certifications Required"
                name="certificationsRequired"
                onChange={formik.handleChange}
                value={formik.values.certificationsRequired}
              />
            </Box>
          </AccordionDetails>
        </Accordion>
      </div>

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ 
          mt: 3, 
          mb: 2,
          backgroundColor: theme.palette.secondary[300],
          color: 'white',
          '&:hover': {
            backgroundColor: theme.palette.secondary[400],
          },
        }}
      >
        Search
      </Button>
      <Button
        type="button"
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleClear}
        sx={{ 
          backgroundColor: theme.palette.grey[200],
          color: 'black',
          '&:hover': {
            backgroundColor: theme.palette.grey[300],
          },
        }}
      >
        Reset
      </Button>
    </form>
  );
};

export default PurchaseForm;
