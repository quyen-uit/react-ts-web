import { useCallback, useState } from 'react';

export const useTableUIState = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isFilter, setisFilter] = useState(true);
  const [density, setDensity] = useState(1);

  const toggleFullScreen = useCallback(() => {
    setIsFullScreen((prev) => !prev);
  }, []);

  const toggleFilter = useCallback(() => {
    setisFilter((prev) => !prev);
  }, []);

  const handleDensityChange = useCallback((newDensity: number) => {
    setDensity(newDensity);
  }, []);

  return {
    isFullScreen,
    toggleFullScreen,
    isFilter,
    toggleFilter,
    density,
    handleDensityChange,
  };
};
