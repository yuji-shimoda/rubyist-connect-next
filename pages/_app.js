import { UserProvider } from '@supabase/auth-helpers-react';
import { supabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextUIProvider } from '@nextui-org/react';
import { RecoilRoot } from 'recoil';

function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <UserProvider supabaseClient={supabaseClient}>
        <RecoilRoot>
          <Component {...pageProps} />
        </RecoilRoot>
      </UserProvider>
    </NextUIProvider>
  );
}

export default App;
