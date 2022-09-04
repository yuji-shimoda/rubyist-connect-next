import { atom } from 'recoil';

export const rubyistsState = atom({
  key: 'rubyists', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
