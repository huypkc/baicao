export function getInitialState() {
  return {
    match: {
      match: 0,
      deckId: null,
      players: [
        {
          id: 1,
          name: 'Midu',
          avatar: 'http://i.chieu-cao.net/wp-content/uploads/2016/12/chieu-cao-va-tieu-su-hot-girl-dien-vien-midu.jpg',
          points: 0,
          currentCards: []
        },
        {
          id: 2,
          name: 'Kha Banh',
          avatar: 'http://i.chieu-cao.net/wp-content/uploads/2016/12/chieu-cao-va-tieu-su-hot-girl-dien-vien-midu.jpg',
          points: 0,
          currentCards: []
        },
        {
          id: 3,
          name: 'You',
          avatar: 'http://i.chieu-cao.net/wp-content/uploads/2016/12/chieu-cao-va-tieu-su-hot-girl-dien-vien-midu.jpg',
          points: 0,
          currentCards: []
        },
        {
          id: 4,
          name: 'Kim Jong Un',
          avatar: 'http://i.chieu-cao.net/wp-content/uploads/2016/12/chieu-cao-va-tieu-su-hot-girl-dien-vien-midu.jpg',
          points: 0,
          currentCards: []
        }
      ],
      cards: []
    }
  };
}

export interface AppState {
  match: any
}
