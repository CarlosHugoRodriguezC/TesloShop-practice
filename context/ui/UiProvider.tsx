import { FC, PropsWithChildren, useState } from 'react';
import { UiContext } from './';

export interface UiState {
  isMenuOpen: boolean;
}

const UI_INITIAL_STATE: UiState = {
  isMenuOpen: false,
};

export const UiProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, setState] = useState(UI_INITIAL_STATE);

  const toggleMenu = () => {
    setState({
      isMenuOpen: !state.isMenuOpen,
    });
  };

  return (
    <UiContext.Provider
      value={{
        isMenuOpen: state.isMenuOpen,
        toggleMenu,
      }}>
      {children}
    </UiContext.Provider>
  );
};
