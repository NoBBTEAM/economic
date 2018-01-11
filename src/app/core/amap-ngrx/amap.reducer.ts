// src/app/core/pet-tag.reducer.ts
import { Action } from '@ngrx/store';
import { ADD, DELETE, OPEN_INFO, CLOSE_INFO } from './amap.actions';
import { Amap, AmapInit } from './amap.model';

export function amapReducer(state: Amap = AmapInit, {type, payload}) {
  switch (type) {
    case ADD:
      return Object.assign({}, state, payload);
    case DELETE:
      return Object.assign({}, state, payload);
    case OPEN_INFO:
      return Object.assign({}, state, payload);
    case CLOSE_INFO:
      return Object.assign({}, state, payload);
    default:
      return state;
  }
}
