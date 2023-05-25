// import React, { useRef, useState } from 'react';
// import styled from 'styled-components';
// import { useSpring, animated } from 'react-spring';
// import { useOutsideDetect } from './useOutsideDetect';

// const DropdownContainer = styled.div`
//   position: relative;
//   display: inline-block;
//   width: 100%;
//   max-width: 150px;
// `;

// const DropdownButton = styled.div`
//   border: 1px solid black;
//   padding: 10px;
//   cursor: pointer;
//   text-align: center;
//   background: white;
// `;

// const DropdownContent = styled.div`
//   position: absolute;
//   top: 125%;
//   margin: 0 auto;
//   width: 100%;
//   border: 1px solid black;
//   transform-origin: top;
//   background: white;
// `;

// const DropdownElement = styled.div`
//   padding: 10px;
//   cursor: pointer;
//   text-align: center;
//   transition: 0.3s ease all;

//   &:hover {
//     background: rgba(0, 0, 0, 0.05);
//   }
// `;

// const initialProps = {
//   opacity: 0,
//   transform: 'scaleY(0)',
// };

// const finalProps = {
//   opacity: 1,
//   transform: 'scaleY(1)',
// };

// const AnimatedDropdownContent = animated(DropdownContent);

// const Dropdown = ({ title, children }) => {
//   const ref = useRef(null);
//   const [props, api] = useSpring(() => initialProps);

//   const [_, setShow] = useState(false);

//   const toggleDropdown = (val) => {
//     if (typeof val !== 'undefined') {
//       api(val ? finalProps : initialProps);
//       setShow(val);
//     } else {
//       setShow((prevState) => {
//         if (prevState) api(initialProps);
//         else api(finalProps);
//         return !prevState;
//       });
//     }
//   };

//   useOutsideDetect(ref, () => toggleDropdown(false));

//   return (
//     <DropdownContainer ref={ref}>
//       <DropdownButton onClick={toggleDropdown}>{title}</DropdownButton>
//       <AnimatedDropdownContent style={props}>
//         {React.Children.map(children, (child) => {
//           return React.cloneElement(child, {
//             onClick: () => {
//               if (child.props.onClick) child.props.onClick();
//               toggleDropdown();
//             },
//           });
//         })}
//       </AnimatedDropdownContent>
//     </DropdownContainer>
//   );
// };

// Dropdown.Element = DropdownElement;

// export default Dropdown;
