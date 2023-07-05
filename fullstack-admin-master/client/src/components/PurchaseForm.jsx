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
  Autocomplete
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
      fabricConstruction: [],
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

  const handleProductCategoryChange = (event) => {
    const { value } = event.target;
    formik.setFieldValue('productCategory', value);
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

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl fullWidth margin="normal">
        <InputLabel id="productCategory">Product Category</InputLabel>
        <Select
          id="productCategory"
          label="Product Category"
          name="productCategory"
          value={formik.values.productCategory}
          onChange={handleProductCategoryChange}
          renderValue={(selected) => (Array.isArray(selected) ? selected.join(', ') : selected)}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: '400px',
                overflow: 'auto',
              },
            },
          }}
        >
          <MenuItem value={'Tops'}>
            <ListItemText primary="Tops" />
            <Checkbox checked={formik.values.productCategory.indexOf('Tops') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Bottoms'}>
            <ListItemText primary="Bottoms" />
            <Checkbox checked={formik.values.productCategory.indexOf('Bottoms') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Dresses'}>
            <ListItemText primary="Dresses" />
            <Checkbox checked={formik.values.productCategory.indexOf('Dresses') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Outerwear'}>
            <ListItemText primary="Outerwear" />
            <Checkbox checked={formik.values.productCategory.indexOf('Outerwear') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Undergarments'}>
            <ListItemText primary="Undergarments" />
            <Checkbox checked={formik.values.productCategory.indexOf('Undergarments') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Activewear'}>
            <ListItemText primary="Activewear" />
            <Checkbox checked={formik.values.productCategory.indexOf('Activewear') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Swimwear'}>
            <ListItemText primary="Swimwear" />
            <Checkbox checked={formik.values.productCategory.indexOf('Swimwear') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Sleepwear'}>
            <ListItemText primary="Sleepwear" />
            <Checkbox checked={formik.values.productCategory.indexOf('Sleepwear') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Accessories'}>
            <ListItemText primary="Accessories" />
            <Checkbox checked={formik.values.productCategory.indexOf('Accessories') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Footwear'}>
            <ListItemText primary="Footwear" />
            <Checkbox checked={formik.values.productCategory.indexOf('Footwear') > -1} />
          </MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="materialType">Material Type</InputLabel>
        <Select
          id="materialType"
          label="Material Type"
          name="materialType"
          value={formik.values.materialType}
          onChange={handleMaterialTypeChange}
          renderValue={(selected) => (Array.isArray (selected) ? selected.join(', ') : selected)}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: '400px',
                overflow: 'auto',
              },
            },
          }}
        >
          <MenuItem value={'Cotton'}>
            <ListItemText primary="Cotton" />
            <Checkbox checked={formik.values.materialType.indexOf('Cotton') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Polyester'}>
            <ListItemText primary="Polyester" />
            <Checkbox checked={formik.values.materialType.indexOf('Polyester') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Silk'}>
            <ListItemText primary="Silk" />
            <Checkbox checked={formik.values.materialType.indexOf('Silk') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Wool'}>
            <ListItemText primary="Wool" />
            <Checkbox checked={formik.values.materialType.indexOf('Wool') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Denim'}>
            <ListItemText primary="Denim" />
            <Checkbox checked={formik.values.materialType.indexOf('Denim') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Leather'}>
            <ListItemText primary="Leather" />
            <Checkbox checked={formik.values.materialType.indexOf('Leather') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Suede'}>
            <ListItemText primary="Suede" />
            <Checkbox checked={formik.values.materialType.indexOf('Suede') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Satin'}>
            <ListItemText primary="Satin" />
            <Checkbox checked={formik.values.materialType.indexOf('Satin') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Velvet'}>
            <ListItemText primary="Velvet" />
            <Checkbox checked={formik.values.materialType.indexOf('Velvet') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Linen'}>
            <ListItemText primary="Linen" />
            <Checkbox checked={formik.values.materialType.indexOf('Linen') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Rayon'}>
            <ListItemText primary="Rayon" />
            <Checkbox checked={formik.values.materialType.indexOf('Rayon') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Nylon'}>
            <ListItemText primary="Nylon" />
            <Checkbox checked={formik.values.materialType.indexOf('Nylon') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Spandex'}>
            <ListItemText primary="Spandex" />
            <Checkbox checked={formik.values.materialType.indexOf('Spandex') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Lycra'}>
            <ListItemText primary="Lycra" />
            <Checkbox checked={formik.values.materialType.indexOf('Lycra') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Cashmere'}>
            <ListItemText primary="Cashmere" />
            <Checkbox checked={formik.values.materialType.indexOf('Cashmere') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Chiffon'}>
            <ListItemText primary="Chiffon" />
            <Checkbox checked={formik.values.materialType.indexOf('Chiffon') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Flannel'}>
            <ListItemText primary="Flannel" />
            <Checkbox checked={formik.values.materialType.indexOf('Flannel') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Gabardine'}>
            <ListItemText primary="Gabardine" />
            <Checkbox checked={formik.values.materialType.indexOf('Gabardine') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Georgette'}>
            <ListItemText primary="Georgette" />
            <Checkbox checked={formik.values.materialType.indexOf('Georgette') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Jersey'}>
            <ListItemText primary="Jersey" />
            <Checkbox checked={formik.values.materialType.indexOf('Jersey') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Lace'}>
            <ListItemText primary="Lace" />
            <Checkbox checked={formik.values.materialType.indexOf('Lace') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Muslin'}>
            <ListItemText primary="Muslin" />
            <Checkbox checked={formik.values.materialType.indexOf('Muslin') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Organza'}>
            <ListItemText primary="Organza" />
            <Checkbox checked={formik.values.materialType.indexOf('Organza') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Poplin'}>
            <ListItemText primary="Poplin" />
            <Checkbox checked={formik.values.materialType.indexOf('Poplin') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Tweed'}>
            <ListItemText primary="Tweed" />
            <Checkbox checked={formik.values.materialType.indexOf('Tweed') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Twill'}>
            <ListItemText primary="Twill" />
            <Checkbox checked={formik.values.materialType.indexOf('Twill') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Voile'}>
            <ListItemText primary="Voile" />
            <Checkbox checked={formik.values.materialType.indexOf('Voile') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Faux Fur'}>
            <ListItemText primary="Faux Fur" />
            <Checkbox checked={formik.values.materialType.indexOf('Faux Fur') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Fleece'}>
            <ListItemText primary="Fleece" />
            <Checkbox checked={formik.values.materialType.indexOf('Fleece') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Neoprene'}>
            <ListItemText primary="Neoprene" />
            <Checkbox checked={formik.values.materialType.indexOf('Neoprene') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Vinyl'}>
            <ListItemText primary="Vinyl" />
            <Checkbox checked={formik.values.materialType.indexOf('Vinyl') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Hemp'}>
            <ListItemText primary="Hemp" />
            <Checkbox checked={formik.values.materialType.indexOf('Hemp') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Jute'}>
            <ListItemText primary="Jute" />
            <Checkbox checked={formik.values.materialType.indexOf('Jute') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Bamboo'}>
            <ListItemText primary="Bamboo" />
            <Checkbox checked={formik.values.materialType.indexOf('Bamboo') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Modal'}>
            <ListItemText primary="Modal" />
            <Checkbox checked={formik.values.materialType.indexOf('Modal') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Tencel'}>
            <ListItemText primary="Tencel" />
            <Checkbox checked={formik.values.materialType.indexOf('Tencel') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Seersucker'}>
            <ListItemText primary="Seersucker" />
            <Checkbox checked={formik.values.materialType.indexOf('Seersucker') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Brocade'}>
            <ListItemText primary="Brocade" />
            <Checkbox checked={formik.values.materialType.indexOf('Brocade') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Corduroy'}>
            <ListItemText primary="Corduroy" />
            <Checkbox checked={formik.values.materialType.indexOf('Corduroy') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Damask'}>
            <ListItemText primary="Damask" />
            <Checkbox checked={formik.values.materialType.indexOf('Damask') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Khaki'}>
            <ListItemText primary="Khaki" />
            <Checkbox checked={formik.values.materialType.indexOf('Khaki') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Pique'}>
            <ListItemText primary="Pique" />
            <Checkbox checked={formik.values.materialType.indexOf('Pique') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Plisse'}>
            <ListItemText primary="Plisse" />
            <Checkbox checked={formik.values.materialType.indexOf('Plisse') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Velour'}>
            <ListItemText primary="Velour" />
            <Checkbox checked={formik.values.materialType.indexOf('Velour') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Acrylic'}>
            <ListItemText primary="Acrylic" />
            <Checkbox checked={formik.values.materialType.indexOf('Acrylic') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Microfiber'}>
            <ListItemText primary="Microfiber" />
            <Checkbox checked={formik.values.materialType.indexOf('Microfiber') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Polypropylene'}>
            <ListItemText primary="Polypropylene" />
            <Checkbox checked={formik.values.materialType.indexOf('Polypropylene') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Gore-Tex'}>
            <ListItemText primary="Gore-Tex" />
            <Checkbox checked={formik.values.materialType.indexOf('Gore-Tex') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Tyvek'}>
            <ListItemText primary="Tyvek" />
            <Checkbox checked={formik.values.materialType.indexOf('Tyvek') > -1} />
          </MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel id="fabricConstruction">Fabric Construction</InputLabel>
        <Select
          id="fabricConstruction"
          label="Fabric Construction"
          name="fabricConstruction"
          multiple
          value={formik.values.fabricConstruction}
          onChange={handleFabricConstructionChange}
          renderValue={(selected) => (Array.isArray(selected) ? selected.join(', ') : selected)}
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: '400px',
                overflow: 'auto',
              },
            },
          }}
        >
          <MenuItem value={'Woven'}>
            <ListItemText primary="Woven" />
            <Checkbox checked={formik.values.fabricConstruction.indexOf('Woven') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Knit'}>
            <ListItemText primary="Knit" />
            <Checkbox checked={formik.values.fabricConstruction.indexOf('Knit') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Non-Woven'}>
            <ListItemText primary="Non-Woven" />
            <Checkbox checked={formik.values.fabricConstruction.indexOf('Non-Woven') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Synthetic'}>
            <ListItemText primary="Synthetic" />
            <Checkbox checked={formik.values.fabricConstruction.indexOf('Synthetic') > -1} />
          </MenuItem>
          <Divider orientation="horizontal" variant="middle" />
          <MenuItem value={'Blended'}>
            <ListItemText primary="Blended" />
            <Checkbox checked={formik.values.fabricConstruction.indexOf('Blended') > -1} />
          </MenuItem>
        </Select>
      </FormControl>

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
