import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextUIProvider } from "@nextui-org/react";

function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <UserProvider supabaseClient={supabaseClient}>
        <Component {...pageProps} />
      </UserProvider>
    </NextUIProvider>
  );
}

export default App;
