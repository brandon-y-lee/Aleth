import React, { useState } from 'react';
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
  ListItemText
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useFormik } from 'formik';

const PurchaseForm = ({ onSearch }) => {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  const formik = useFormik({
    initialValues: {
      productCategory: [],
      materialType: '',
      fabricConstruction: '',
      countryOfOrigin: '',
      weightOfFabric: '',
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

  const handleProductCategoryChange = (event) => {
    const { value } = event.target;
    formik.setFieldValue('productCategory', value);
  };

  const handleClear = () => {
    formik.resetForm();
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl required fullWidth margin="normal">
        <InputLabel id="productCategory">Product Category</InputLabel>
        <Select
          id="productCategory"
          label="Product Category"
          name="productCategory"
          multiple
          value={formik.values.productCategory}
          onChange={handleProductCategoryChange}
          renderValue={(selected) => (Array.isArray(selected) ? selected.join(', ') : selected)}
        >
          <MenuItem value={'Tops'}>
            <ListItemText primary="Tops" />
            <Checkbox checked={formik.values.productCategory.indexOf('Tops') > -1} />
          </MenuItem>
          <MenuItem value={'Bottoms'}>
            <ListItemText primary="Bottoms" />
            <Checkbox checked={formik.values.productCategory.indexOf('Bottoms') > -1} />
          </MenuItem>
          <MenuItem value={'Dresses'}>
            <ListItemText primary="Dresses" />
            <Checkbox checked={formik.values.productCategory.indexOf('Dresses') > -1} />
          </MenuItem>
          <MenuItem value={'Outerwear'}>
            <ListItemText primary="Outerwear" />
            <Checkbox checked={formik.values.productCategory.indexOf('Outerwear') > -1} />
          </MenuItem>
          <MenuItem value={'Undergarments'}>
            <ListItemText primary="Undergarments" />
            <Checkbox checked={formik.values.productCategory.indexOf('Undergarments') > -1} />
          </MenuItem>
          <MenuItem value={'Activewear'}>
            <ListItemText primary="Activewear" />
            <Checkbox checked={formik.values.productCategory.indexOf('Activewear') > -1} />
          </MenuItem>
          <MenuItem value={'Swimwear'}>
            <ListItemText primary="Swimwear" />
            <Checkbox checked={formik.values.productCategory.indexOf('Swimwear') > -1} />
          </MenuItem>
          <MenuItem value={'Sleepwear'}>
            <ListItemText primary="Sleepwear" />
            <Checkbox checked={formik.values.productCategory.indexOf('Sleepwear') > -1} />
          </MenuItem>
          <MenuItem value={'Accessories'}>
            <ListItemText primary="Accessories" />
            <Checkbox checked={formik.values.productCategory.indexOf('Accessories') > -1} />
          </MenuItem>
          <MenuItem value={'Footwear'}>
            <ListItemText primary="Footwear" />
            <Checkbox checked={formik.values.productCategory.indexOf('Footwear') > -1} />
          </MenuItem>
        </Select>
      </FormControl>
      <TextField
        margin="normal"
        required
        fullWidth
        id="materialType"
        label="Material Type"
        name="materialType"
        onChange={formik.handleChange}
        value={formik.values.materialType}
      />
      <FormControl required fullWidth margin="normal">
        <InputLabel id="fabricConstruction">Fabric Construction</InputLabel>
        <Select
          id="fabricConstruction"
          label="Fabric Construction"
          name="fabricConstruction"
          value={formik.values.fabricConstruction}
          onChange={formik.handleChange}
        >
          <MenuItem value={'Woven'}>
            <ListItemText primary="Woven" />
            <Checkbox checked={formik.values.productCategory.indexOf('Woven') > -1} />
          </MenuItem>
          <MenuItem value={'Knit'}>
            <ListItemText primary="Knit" />
            <Checkbox checked={formik.values.productCategory.indexOf('Knit') > -1} />
          </MenuItem>
          <MenuItem value={'Non-Woven'}>
            <ListItemText primary="Non-Woven" />
            <Checkbox checked={formik.values.productCategory.indexOf('Non-Woven') > -1} />
          </MenuItem>
          <MenuItem value={'Lace'}>
            <ListItemText primary="Lace" />
            <Checkbox checked={formik.values.productCategory.indexOf('Lace') > -1} />
          </MenuItem>
          <MenuItem value={'Fleece'}>
            <ListItemText primary="Fleece" />
            <Checkbox checked={formik.values.productCategory.indexOf('Fleece') > -1} />
          </MenuItem>
          <MenuItem value={'Velvet'}>
            <ListItemText primary="Velvet" />
            <Checkbox checked={formik.values.productCategory.indexOf('Velvet') > -1} />
          </MenuItem>
          <MenuItem value={'Denim'}>
            <ListItemText primary="Denim" />
            <Checkbox checked={formik.values.productCategory.indexOf('Denim') > -1} />
          </MenuItem>
          <MenuItem value={'Leather'}>
            <ListItemText primary="Leather" />
            <Checkbox checked={formik.values.productCategory.indexOf('Leather') > -1} />
          </MenuItem>
          <MenuItem value={'Synthetic'}>
            <ListItemText primary="Synthetic" />
            <Checkbox checked={formik.values.productCategory.indexOf('Synthetic') > -1} />
          </MenuItem>
          <MenuItem value={'Blended'}>
            <ListItemText primary="Blended" />
            <Checkbox checked={formik.values.productCategory.indexOf('Blended') > -1} />
          </MenuItem>
        </Select>
      </FormControl>

      <TextField
        margin="normal"
        required
        fullWidth
        id="countryOfOrigin"
        label="Country/Region of Origin"
        name="countryOfOrigin"
        onChange={formik.handleChange}
        value={formik.values.countryOfOrigin}
      />
      <Accordion 
        expanded={expanded} 
        onChange={() => setExpanded(!expanded)}
        sx={{
          position: expanded ? 'absolute' : 'relative',
          zIndex: expanded ? 'modal' : 'auto',
          backgroundColor: theme.palette.background.paper,
          overflow: 'auto',
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
              id="weightOfFabric"
              label="Weight of Fabric"
              name="weightOfFabric"
              onChange={formik.handleChange}
              value={formik.values.weightOfFabric}
            />
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
            <TextField
              margin="normal"
              fullWidth
              id="quantity"
              label="Quantity"
              name="quantity"
              onChange={formik.handleChange}
              value={formik.values.quantity}
            />
            <TextField
              margin="normal"
              fullWidth
              id="priceRange"
              label="Price Range"
              name="priceRange"
              onChange={formik.handleChange}
              value={formik.values.priceRange}
            />
            <TextField
              margin="normal"
              fullWidth
              id="deliveryDate"
              label="Delivery Date"
              name="deliveryDate"
              onChange={formik.handleChange}
              value={formik.values.deliveryDate}
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
      >
        Reset
      </Button>
    </form>
  );
};

export default PurchaseForm;
