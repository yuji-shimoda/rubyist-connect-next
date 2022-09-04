import { Text, Navbar, User } from '@nextui-org/react';
import { LogOutButton } from '../components/LogOutButton';

function AppBar({ user }) {
  return (
    <Navbar>
      <Navbar.Brand>
        <Text b color="error">
          Rubyist Connect
        </Text>
      </Navbar.Brand>

      <Navbar.Content>
        <LogOutButton />
        <Navbar.Item>
          <User bordered src={user?.user_metadata?.avatar_url} color="error" />
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}

export default AppBar;
