import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { Text, Navbar, User, Button, Tooltip } from "@nextui-org/react";
import { MdLogout } from "react-icons/md";
import { useRouter } from "next/router";

function AppBar({ user }) {
  const router = useRouter();
  function logout() {
    supabaseClient.auth.signOut();
    router.replace("/");
  }
  return (
    <Navbar>
      <Navbar.Brand>
        <Text b color="error">
          Rubyist Connect
        </Text>
      </Navbar.Brand>
      <Navbar.Content>
        <Tooltip
          color="invert"
          rounded
          content="Logout"
          placement="bottom"
          hideArrow
        >
          <Button
            auto
            color="error"
            onPress={logout}
            icon={<MdLogout size={20} />}
          />
        </Tooltip>
        <Navbar.Item>
          <User bordered src={user?.user_metadata?.avatar_url} color="error" />
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}

export default AppBar;
