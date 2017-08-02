/**
 * Created by sargis on 7/8/17.
 */
import BoardView from '../view/component/BoardView'
import BoardProxy from '../model/BoardProxy'
import PureMVC from 'pure-mvc'

export default class BoardCommand extends PureMVC.SimpleCommand {
  execute (notification) {
    const name = notification.getName()
    const body = notification.getBody()
    switch (name) {
      case BoardView.CELL_CLICK:
        this.proxy.selectCell(body)
        break
      case BoardView.PLAYER_SELECT:
        this.proxy.detectPossibleMoves()
        break
    }
  }

  get proxy () {
    return this.facade.retrieveProxy(BoardProxy.NAME)
  }
}
