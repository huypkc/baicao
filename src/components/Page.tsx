import * as React from 'react';
import { connect } from 'react-redux';
import './Page.css';
import { Dispatch } from 'redux';
import { Table, ButtonToolbar, Button } from 'react-bootstrap';
import { AppState } from '../core/state';
import { requestNewDeck, reveal, newGame } from '../core/actions/MatchAction';

declare const Deck: any;
class Page extends React.Component<any, any> {
  myRef: any;
  deck = Deck();
  constructor(props: any) {
    super(props);
    const { dispatch } = this.props;
    this.myRef = React.createRef();
    this.state = { drawn: false, revealed: false };
    dispatch(requestNewDeck(this.state.revealed));
  }

  public componentDidMount() {
    this.deck.mount(this.myRef.current);
    this.deck.shuffle();
  }

  public componentWillReceiveProps(nextProps: any) {
  }
  shuffle() {
    const { dispatch } = this.props;
    this.deck.shuffle();
    if (this.props.match === 4) {
      dispatch(newGame());
    }
    dispatch(requestNewDeck(this.state.revealed))
    this.setState({drawn: false, revealed: false});
  }
  draw() {
    this.setState({drawn : true});
  }
  reveal() {
    const { dispatch } = this.props;
    this.setState({revealed : true});
    dispatch(reveal());
    if (this.props.match === 4) {
        const max = Math.max.apply(null, this.props.players.map((p: any) => p.points));
        const winners = this.props.players.filter((p: any) => p.points === max).map((p: any) => p.name);
        setTimeout(() => alert(`Winner(s) is(are) ${winners.join(', ')}`), 400);
    }
  }

  public render() {
    const players = this.props.players && this.props.players.sort((a: any, b: any) => a.id - b.id).map((player: any, index: number) =>
      (
        <div className={`Player Player-${index + 1}`} key={player.id}>
          <div className="Info">
            <div className="Avatar" style={{ background: `url(${player.avatar}) no-repeat center center`, backgroundSize: 'cover' }}></div>
            <div className="Name">{player.name}</div>
          </div>
          {this.state.drawn && (
            <div className="Cards row">
              {player.currentCards && player.currentCards.map((card: any, index: number) => (
                <div className="Card mr-2" key={index} style={{background: `${this.state.revealed ? 'url(' + card.images.png + ') no-repeat center center' : 'url(https://deck-of-cards.js.org/faces/back.png)'}`}}></div>
              ))}
            </div>
          )}
        </div>
      ));
    const rankedPlayers = this.props.players && this.props.players.sort((a: any, b: any) => b.points - a.points).map((player: any, index: number) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{player.name}</td>
          <td>{Math.floor(player.points)}</td>
        </tr>
      )
    })
    return (
      <div className={`MainPage row ${!this.props.deckId && 'd-none'}`}>
        <h4 style={{ position: "fixed", left: "10px" }}>MATCH {this.props.match + 1}</h4>
        <div className="Desk">
          <div ref={this.myRef} className="CardCollections">
          </div>
          {players}
        </div>
        <div className="Actions">
          <Table striped bordered hover style={{ width: 'auto' }}>
            <thead>
              <tr>
                <th>#</th>
                <th>Player</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {rankedPlayers}
            </tbody>
          </Table>
          <ButtonToolbar>
            <Button variant="primary" onClick={() => this.shuffle()} size="sm" className="mr-2">Shuffle</Button>
            <Button variant="warning" size="sm" className="mr-2" onClick={() => this.draw()}>Draw</Button>
            <Button variant="danger" size="sm" onClick={() => this.reveal()} disabled={!this.state.drawn || this.state.revealed}>Reveal</Button>
          </ButtonToolbar>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return state.match;
};

export default connect(mapStateToProps)(Page);
