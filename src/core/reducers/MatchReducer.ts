import { DECK_RECEIVE_NEW } from './../actions/MatchAction';
import * as MATCH_ACTION from '../actions/MatchAction';
import { getInitialState } from '../state';
function convertPoint(value: any) {
  if (value === 'ACE') return 1;
  if (Number.isInteger(Number(value))) return Number(value);
  return 10;
}
export default function MatchReducer(
  state: any = {},
  action: any
) {
  switch (action.type) {
    case MATCH_ACTION.DECK_RECEIVE_NEW: {
      state.players.forEach((player: any, i: number) => { player.currentCards = [] });
      action.cards.forEach((card: any, i: number) => {
        state.players[i % 4].currentCards.push(card);
      });
      return { ...state, deckId: action.deckId, cards: action.cards }
    }
    case MATCH_ACTION.DECK_REQUEST_NEW: {
      return { ...state, match: action.revealed? state.match + 1: state.match }
    }
    case MATCH_ACTION.DECK_REVEAL: {
      let winners: number[] = [];
      state.players.forEach((player: any, index: number) => {
        const sureWin = player.currentCards.every((card: any) => card.value !== 'ACE' && (Number.isNaN(Number(card.value))));
        sureWin && winners.push(index);
      });
      if (!winners.length) {
        const points = state.players.map((player: any) => player.currentCards.reduce((a: any, b: any) => ({ value: (convertPoint(a.value) + convertPoint(b.value)) % 10 }))).map((p: any) => p.value);
        const max = Math.max.apply(null, points);
        points.forEach((point: number, i: number) => {
          if (point === max) winners.push(i);
        })
      }
      state.players.forEach((player: any, i: number) => { player.points = winners.indexOf(i) > -1 ? player.points + 20000 / winners.length : player.points });

      return { ...state };
    }
    case MATCH_ACTION.NEW_GAME: {
      const init = getInitialState();
      return {...init.match, deckId: state.deckId, match: -1};
    }
    default:
      return state;
  }
}