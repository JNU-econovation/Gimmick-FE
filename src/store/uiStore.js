import {create} from 'zustand';

const useUiStore = create(set => ({
  isDeleteMode: false,

  setDeleteMode: value => {
    set({isDeleteMode: value});
  },
}));

export default useUiStore;
