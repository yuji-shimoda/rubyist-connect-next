import { Text, Navbar, User, Button, Tooltip } from '@nextui-org/react';
import { LogOutButton } from '../components/LogOutButton';
import { MdEditCalendar } from 'react-icons/md';
import router from 'next/router';

function AppBar({ user }) {
  function move_events() {
    router.push('/nnect/events');
  }

  return (
    <Navbar>
      <Navbar.Brand>
        <Text b color="error">
          Rubyist Connect
        </Text>
      </Navbar.Brand>

      <Navbar.Content>
        <Tooltip color="invert" rounded content="Events" placement="bottom" hideArrow>
          <Button auto color="error" onPress={move_events} icon={<MdEditCalendar size={20} />} />
        </Tooltip>
        <LogOutButton />
        <Navbar.Item>
          <User bordered src={user?.user_metadata?.avatar_url} color="error" />
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}

export default AppBar;
