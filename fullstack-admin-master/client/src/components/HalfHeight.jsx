const { Box } = require("@mui/material");
const { styled } = require("@mui/system");

const HalfHeight = styled(Box)({
    height: '50%',
    overflow: 'auto', // This will add a scrollbar if the content overflows
});

export default HalfHeight;
