import { Fragment, useContext } from 'react';

import MainHeader from './main-header';
import Notification from '../ui/notification';
import NotificationContext from '../../store/notification-context';

function Layout(props) {
  const notifictionCtx = useContext(NotificationContext);

  const activeNotifiction = notifictionCtx.notification;

  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {activeNotifiction && (
        <Notifiction
          title={activeNotifiction.title}
          message={activeNotifiction.message}
          status={activeNotifiction.status}
        />
      )}
    </Fragment>
  );
}

export default Layout;
