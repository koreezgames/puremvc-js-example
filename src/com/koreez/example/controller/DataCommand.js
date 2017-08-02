/**
 * Created by sargis on 7/6/17.
 */
import BoardProxy from '../model/BoardProxy'
import BoardView from '../view/component/BoardView'
import PureMVC from 'pure-mvc'

export default class DataCommand extends PureMVC.SimpleCommand {
  execute (notification) {
    const name = notification.getName()
    const body = notification.getBody()
    switch (name) {
      case BoardView.DATA_GET:
        this.proxy.jsonDataGet()
        break
    }
  }

  get proxy () {
    return this.facade.retrieveProxy(BoardProxy.NAME)
  }
}
