import { Text, Navbar, Button, Tooltip, Dropdown, Avatar, Link } from '@nextui-org/react';
import { MdEditCalendar } from 'react-icons/md';
import router from 'next/router';

function AppBar({ user }) {
  const collapseItems = ['Profile', 'My Settings', 'Log Out'];
  function move_events() {
    router.push('/nnect/events');
  }
  function menuAction(actionKey) {
    switch (actionKey) {
      case 'settings':
        router.push('/settings/profile');
        break;
      case 'logout':
        router.push('/api/auth/logout');
        break;
      default:
        break;
    }
  }
  return (
    <Navbar>
      <Navbar.Brand>
        <Text b color="error">
          Rubyist Connect
        </Text>
      </Navbar.Brand>
      <Navbar.Content
        css={{
          '@xs': {
            w: '12%',
            jc: 'flex-end',
          },
        }}>
        <Tooltip color="invert" rounded content="Events" placement="bottom" hideArrow>
          <Button auto color="error" onClick={move_events} icon={<MdEditCalendar size={20} />} />
        </Tooltip>
        <Dropdown placement="bottom-right">
          <Navbar.Item>
            <Dropdown.Trigger>
              <Avatar
                squared
                bordered
                as="button"
                color="error"
                size="md"
                src={`${user?.user_metadata?.avatar_url}`}
              />
            </Dropdown.Trigger>
          </Navbar.Item>
          <Dropdown.Menu aria-label="User menu actions" color="secondary" onAction={menuAction}>
            <Dropdown.Item key="profile" css={{ height: '$18' }}>
              <Text b color="inherit" css={{ d: 'flex' }}>
                {user?.user_metadata?.name}
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key="settings" withDivider>
              My Settings
            </Dropdown.Item>
            <Dropdown.Item key="logout" withDivider color="error">
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar.Content>
      <Navbar.Collapse>
        {collapseItems.map((item, index) => (
          <Navbar.CollapseItem
            key={item}
            activeColor="secondary"
            css={{
              color: index === collapseItems.length - 1 ? '$error' : '',
            }}
            isActive={index === 2}>
            <Link
              color="inherit"
              css={{
                minWidth: '100%',
              }}
              href="#">
              {item}
            </Link>
          </Navbar.CollapseItem>
        ))}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppBar;
