import { atom } from 'recoil';

export const eventsState = atom({
  key: 'events', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});
