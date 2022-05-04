import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { NotificationsProvider } from "@mantine/notifications";

export default function Application({ Component, pageProps }) {
  return (
    <MantineProvider
      theme={{ colorScheme: "dark" }}
      withNormalizeCSS
      withGlobalStyles
    >
      <ModalsProvider>
        <NotificationsProvider>
          <Component {...pageProps} />
        </NotificationsProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}
