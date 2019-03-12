import { Dispatch } from "redux";

const DECK_API = 'https://deckofcardsapi.com/api/deck';

export const DECK_REQUEST_NEW = '[DECK] Request new';
function requestNew(revealed: boolean) {
  return {
    type: DECK_REQUEST_NEW,
    revealed
  }
}
export const DECK_RECEIVE_NEW = '[DECK] Receive new';
function receiveNew({ deckId, cards, revealed }: any) {
  return {
    type: DECK_RECEIVE_NEW,
    deckId,
    cards,
  }
}
export const DECK_ERROR_REQUEST_NEW = '[DECK] Error Request new';
function requestNewFail() {
  return {
    type: DECK_ERROR_REQUEST_NEW
  }
}

export function requestNewDeck(revealed: boolean) {
  return (dispatch: Dispatch<any>) => {
    dispatch(requestNew(revealed));
    return fetch(`${DECK_API}/new/shuffle/?deck_count=1`)
      .then((response: any) =>
        response.json()
      )
      .then((response: any) => fetch(`${DECK_API}/${response.deck_id}/draw/?count=12`))
      .then((response: any) =>
        response.json()
      ).then((response: any) => {
        dispatch(receiveNew({ deckId: response.deck_id, cards: response.cards }))
      })

      .catch((error: any) => dispatch(requestNewFail()))
  }
}

export const DECK_REVEAL = '[DECK] Reveal';
function _reveal() {
  return {
    type: DECK_REVEAL,
  }
}
export function reveal() {
  return (dispatch: Dispatch<any>) => {
    dispatch(_reveal());
  }
}
export const NEW_GAME = '[DECK] NEW_GAME';
function _newGame() {
  return {
    type: NEW_GAME,
  }
}
export function newGame() {
  return (dispatch: Dispatch<any>) => {
    dispatch(_newGame());
  }
}

// export const DECK_REQUEST_SHUFFLE = '[DECK] Request shuffle';
// function requestShuffle() {
//   return {
//     type: DECK_REQUEST_SHUFFLE,
//   }
// }
// export const DECK_RECEIVE_SHUFFLE = '[DECK] Receive shuffle';
// function receiveShuffle() {
//   return {
//     type: DECK_RECEIVE_SHUFFLE,
//   }
// }
// export const DECK_ERROR_REQUEST_SHUFFLE = '[DECK] Error Request shuffle';
// function requestShuffleFail() {
//   return {
//     type: DECK_ERROR_REQUEST_SHUFFLE
//   }
// }

// export function requestShuffleDeck(id: string) {
//   return (dispatch: Dispatch<any>) => {
//     dispatch(requestShuffle());
//     return fetch(`${DECK_API}/${id}/shuffle`)
//       .then((response: any) =>
//         response.json()
//       )
//       .then((response: any) =>
//         dispatch(receiveShuffle())
//       )
//       .catch((error: any) => dispatch(requestShuffleFail()))
//   }
// }

// export const DECK_REQUEST_LIST = '[DECK] Request';
// function requestList() {
//   return {
//     type: DECK_REQUEST_LIST,
//   }
// }
// export const DECK_RECEIVE_LIST = '[DECK] Receive';
// function receiveList(cards: any[]) {
//   return {
//     cards,
//     type: DECK_RECEIVE_LIST,
//   }
// }
// export const DECK_ERROR_REQUEST = '[DECK] Error';
// function requestFail() {
//   return {
//     type: DECK_ERROR_REQUEST
//   }
// }

// export function fetchListDeck(id: string) {
//   return (dispatch: Dispatch<any>) => {
//     dispatch(requestList());
//     return fetch(`${DECK_API}/${id}/draw/?count=12`)
//       .then((response: any) =>
//         response.json()
//       )
//       .then((response: any) =>
//         dispatch(receiveList(response.cards))
//       )
//       .catch((error: any) => dispatch(requestFail()))
//   }
// }