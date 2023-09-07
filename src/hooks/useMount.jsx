import React from 'react';
import { ANIMATION_TIME } from '../constants/constants'

export const useMount = ({ opened }) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    if (opened && !mounted) {
      setMounted(true);
    } else if (!opened && mounted) {
      setTimeout(() => {
        setMounted(false);
      }, ANIMATION_TIME)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened])

  return {
    mounted,
  }

}
