const { Box } = require("@mui/material");
const { styled } = require("@mui/system");

const FlexTop = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
});

export default FlexTop;
