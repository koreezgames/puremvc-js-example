/**
 * Created by sargis on 7/4/17.
 */
import ProgressViewMediator from './component/ProgressViewMediator'
import Game from '../Game'
import GameState from '../state/GameState'
import BoardViewMediator from './component/BoardViewMediator'
import BoardView from './component/BoardView'
import PureMVC from 'pure-mvc'

export default class GameMediator extends PureMVC.Mediator {
  static NAME = 'ApplicationMediator'

  constructor (viewComponent) {
    super(Game.NAME, viewComponent)
  }

  onRegister () {
    this.facade.registerMediator(new ProgressViewMediator(this.viewComponent))
  }

  listNotificationInterests () {
    return [
      GameState.READY
    ]
  }

  handleNotification (notification) {
    const name = notification.getName()
    const body = notification.getBody()
    switch (name) {
      case GameState.READY:
        this.facade.registerMediator(new BoardViewMediator(this.viewComponent))
        this.facade.sendNotification(BoardView.DATA_GET)
        break
    }
  }
}
