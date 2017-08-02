/**
 * Created by sargis on 7/4/17.
 */
import GameMediator from '../view/GameMediator'
import BoardProxy from '../model/BoardProxy'
import PureMVC from 'pure-mvc'

export default class StartupCommand extends PureMVC.SimpleCommand {
  execute (notification) {
    this.facade.registerProxy(new BoardProxy())
    this.facade.registerMediator(new GameMediator(notification.getBody().world))
  }
}
