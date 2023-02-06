//INFO: ejemplos de "sagas" y como usarlas
import { eventChannel, END } from 'redux-saga'
import { call, select, takeEvery, all } from 'redux-saga/effects'

//S: LIB *****************************************************

//S: NAV *******************************************************
//S: MAIN **************************************************
export function* rootSaga() { //U: un solo punto de entrada para todas las "sagas"
}

