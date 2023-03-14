import { observer } from 'mobx-react-lite';
import { CartInstance, UserInstance, Stores } from '../../../adapters/presenter';
import { Status } from './Status';
import { SnackbarOrigin } from '@mui/material';

interface StatusItem {
  name: string;
  store: Stores;
  position?: SnackbarOrigin;
}

const Statuses = () => {
  const statuses: StatusItem[] = [
    { name: 'user', store: UserInstance, position: { vertical: 'top', horizontal: 'center' } },
    { name: 'cart', store: CartInstance },
  ];

  return (
    <>
      {statuses.map(item => {
        const { name, store, position } = item;
        const { status, statusMsg } = store;

        if (status && statusMsg) {
          return <Status key={name} status={status} message={statusMsg} position={position} />;
        }
      })}
    </>
  );
};

export default observer(Statuses);
