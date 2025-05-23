import { Extrapolation, interpolate, useDerivedValue } from "react-native-reanimated";
export const useOffsetX = (opts, visibleRanges) => {
  const {
    handlerOffset,
    index,
    size,
    loop,
    dataLength,
    type = "positive",
    viewCount: _viewCount
  } = opts;
  const ITEM_LENGTH = dataLength;
  const VALID_LENGTH = ITEM_LENGTH - 1;
  const TOTAL_WIDTH = size * ITEM_LENGTH;
  const HALF_WIDTH = 0.5 * size;
  const viewCount = _viewCount !== null && _viewCount !== void 0 ? _viewCount : Math.round((ITEM_LENGTH - 1) / 2);
  const positiveCount = type === "positive" ? viewCount : VALID_LENGTH - viewCount;
  let startPos = size * index;
  if (index > positiveCount) startPos = (index - ITEM_LENGTH) * size;
  const MAX = positiveCount * size;
  const MIN = -((VALID_LENGTH - positiveCount) * size);
  const x = useDerivedValue(() => {
    const {
      negativeRange,
      positiveRange
    } = visibleRanges.value;

    if (index >= negativeRange[0] && index <= negativeRange[1] || index >= positiveRange[0] && index <= positiveRange[1]) {
      if (loop) {
        const inputRange = [-TOTAL_WIDTH, MIN - HALF_WIDTH - startPos - Number.MIN_VALUE, MIN - HALF_WIDTH - startPos, 0, MAX + HALF_WIDTH - startPos, MAX + HALF_WIDTH - startPos + Number.MIN_VALUE, TOTAL_WIDTH];
        const outputRange = [startPos, MAX + HALF_WIDTH - Number.MIN_VALUE, MIN - HALF_WIDTH, startPos, MAX + HALF_WIDTH, MIN - HALF_WIDTH + Number.MIN_VALUE, startPos];
        return interpolate(handlerOffset.value, inputRange, outputRange, Extrapolation.CLAMP);
      }

      return handlerOffset.value + size * index;
    }

    return Number.MAX_SAFE_INTEGER;
  }, [loop, dataLength, viewCount, type, size, visibleRanges, handlerOffset]);
  return x;
};
//# sourceMappingURL=useOffsetX.js.map