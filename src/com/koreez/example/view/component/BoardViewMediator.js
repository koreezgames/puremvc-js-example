/**
 * Created by sargis on 7/6/17.
 */
import BoardProxy from '../../model/BoardProxy'
import BoardView from './BoardView'
import PureMVC from 'pure-mvc'

export default class BoardViewMediator extends PureMVC.Mediator {
  static NAME = 'ImagesViewMediator'

  constructor (viewComponent) {
    super(BoardView.NAME, viewComponent)
  }

  onRegister () {
    this.boardView = new BoardView()
    this.boardView.onBoardInputUp.add(this.onBoardViewInputUp, this)
    this.viewComponent.addChild(this.boardView)
  }

  listNotificationInterests () {
    return [
      BoardView.DATA_READY,
      BoardView.PLAYER_SELECT,
      BoardView.PLAYER_DESELECT,
      BoardView.POSSIBLE_MOVES_READY
    ]
  }

  handleNotification (notification) {
    const name = notification.getName()
    const body = notification.getBody()

    switch (name) {
      case BoardView.DATA_READY:
        this.boardView.init(body)
        this.boardView.show()
        break
      case BoardView.PLAYER_SELECT:
        this.boardView.selectPlayer(body)
        break
      case BoardView.PLAYER_DESELECT:
        this.boardView.deselectPlayer()
        this.boardView.cancelHighlightedCells()
        break
      case BoardView.POSSIBLE_MOVES_READY:
        this.boardView.highlightCells(body.duplicateMoves, BoardView.CELL_HIGHLIGHT_DUPLICATE)
        this.boardView.highlightCells(body.jumpMoves, BoardView.CELL_HIGHLIGHT_JUMP)
        break
    }
  }

  get proxy () {
    return this.facade.retrieveProxy(BoardProxy.NAME)
  }

  onBoardViewInputUp (position) {
    console.log('onBoardViewInputUp : i = ' + position.i + ', j=' + position.j)
    this.sendNotification(BoardView.CELL_CLICK, position)
  }
}
