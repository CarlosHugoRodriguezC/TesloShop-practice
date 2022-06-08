import { UiState } from './';

type UiActionTypes =
    | { type: '[UI] - Toggle Menu' } 

export const uiReducer = (state: UiState, action: UiActionTypes): UiState => {
  switch (action.type) {

  case '[UI] - Toggle Menu':
    return { ...state, isMenuOpen: !state.isMenuOpen };

  default:
    return state
  }
}
