import { Html, Head, Main, NextScript } from "next/document";
import { CrecoApp } from "@divops-packages/blog-creco-dev";

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <CrecoApp.Heads />
        <link rel="preload" as="image" href="https://divopsor.github.io/blog-images/coffee-chat-background-wide-light.png" />
        <link rel="preload" as="image" href="https://divopsor.github.io/blog-images/profile-20240823.jpg" />
      </Head>
      <body
        style={{
          backgroundImage:
            "url(https://divopsor.github.io/blog-images/coffee-chat-background-wide-light.png)",
          backgroundSize: "100% 100vh",
          backgroundColor: "rgb(19, 24, 32)"
        }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
