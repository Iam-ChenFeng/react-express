"use strict";

import { createStore } from 'redux';

const ADD = 'ADD';

const add = (state = {}, action) => {
  switch (action.type) {
    case ADD:
      return state;
    default:
      return state;
  }
};

export default createStore(add);