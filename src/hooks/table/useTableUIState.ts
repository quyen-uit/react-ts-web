import { useState } from 'react';

interface UseTableUIStateProps {
  allowFiltering: boolean;
}

export const useTableUIState = ({ allowFiltering }: UseTableUIStateProps) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isFilter, setisFilter] = useState(allowFiltering);
  const [density, setDensity] = useState(1);

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  const toggleFilter = () => {
    setisFilter((prev) => !prev);
  };

  const handleDensityChange = (newDensity: number) => {
    setDensity(newDensity);
  };

  return {
    isFullScreen,
    toggleFullScreen,
    isFilter,
    toggleFilter,
    density,
    handleDensityChange,
  };
};
