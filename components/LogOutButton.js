import { Button, Tooltip } from '@nextui-org/react';
import { MdLogout } from 'react-icons/md';
import router from 'next/router';

async function logout() {
  await router.push('/api/auth/logout');
}
export const LogOutButton = () => {
  return (
    <Tooltip color="invert" rounded content="Logout" placement="bottom" hideArrow>
      <Button auto color="error" onPress={logout} icon={<MdLogout size={20} />} />
    </Tooltip>
  );
};
