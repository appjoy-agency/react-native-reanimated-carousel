import React, { useImperativeHandle, useRef } from "react";
import { useCommonVariables } from "../hooks/useCommonVariables";
import { useInitProps } from "../hooks/useInitProps";
import { usePropsErrorBoundary } from "../hooks/usePropsErrorBoundary";
import { GlobalStateProvider } from "../store";
import { CarouselLayout } from "./CarouselLayout";
const Carousel = /*#__PURE__*/React.forwardRef((_props, ref) => {
  const innerRef = useRef(null);
  useImperativeHandle(ref, () => innerRef.current, []);
  const props = useInitProps(_props);
  const {
    dataLength
  } = props;
  const commonVariables = useCommonVariables(props);
  usePropsErrorBoundary({ ...props,
    dataLength
  });
  return /*#__PURE__*/React.createElement(GlobalStateProvider, {
    value: {
      props,
      common: commonVariables
    }
  }, /*#__PURE__*/React.createElement(CarouselLayout, {
    ref: innerRef
  }));
});
export default Carousel;
//# sourceMappingURL=Carousel.js.map