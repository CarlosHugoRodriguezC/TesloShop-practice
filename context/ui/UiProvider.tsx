import { FC, PropsWithChildren, useReducer } from 'react';
import { UiContext, uiReducer } from './';

export interface UiState {
  isMenuOpen: boolean;
}

const UI_INITIAL_STATE: UiState = {
  isMenuOpen: false,
};

export const UiProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const toggleMenu = () => {
    dispatch({
      type: '[UI] - Toggle Menu',  
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
