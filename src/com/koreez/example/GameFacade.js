/**
 * Created by sargis on 7/4/17.
 */
import StartupCommand from './controller/StartupCommand'
import BoardView from './view/component/BoardView'
import DataCommand from './controller/DataCommand'
import BoardCommand from './controller/BoardCommand'
import {Facade} from 'pure-mvc'

export default class GameFacade extends Facade {
  static KEY = 'Example'
  static NAME = 'ExampleFacade'
  static STARTUP = GameFacade.NAME + 'StartUp'

  static getInstance (key) {
    console.log(Facade.instanceMap);
    if (!Facade.instanceMap[key]) {
      Facade.instanceMap[key] =  new GameFacade(key);
    }
    return Facade.instanceMap[key]
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

  sendNotification (notificationName, ...args) {
    console.log('Sent ' + notificationName)
    super.sendNotification(notificationName, ...args)
  }
}
