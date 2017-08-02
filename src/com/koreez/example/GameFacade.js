/**
 * Created by sargis on 7/4/17.
 */
import StartupCommand from './controller/StartupCommand'
import BoardView from './view/component/BoardView'
import DataCommand from './controller/DataCommand'
import BoardCommand from './controller/BoardCommand'
import PureMVC from 'pure-mvc'

export default class GameFacade extends PureMVC.Facade {
  static KEY = 'Example'
  static NAME = 'ExampleFacade'
  static STARTUP = GameFacade.NAME + 'StartUp'

  static getInstance (key) {
    if (!PureMVC.Facade.instanceMap.has(key)) {
      PureMVC.Facade.instanceMap.set(key, new GameFacade(key))
    }
    return PureMVC.Facade.instanceMap.get(key)
  }

  initializeController () {
    super.initializeController()
    this.registerCommand(GameFacade.STARTUP, StartupCommand)
    this.registerCommand(BoardView.DATA_GET, DataCommand)
    this.registerCommand(BoardView.CELL_CLICK, BoardCommand)
    this.registerCommand(BoardView.PLAYER_SELECT, BoardCommand)
  }

  startup (game) {
    this.sendNotification(GameFacade.STARTUP, game)
  }

  sendNotification (notificationName, body, type) {
    console.log('Sent ' + notificationName)
    super.sendNotification(notificationName, body, type)
  }
}
