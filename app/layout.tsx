import { headers } from "next/headers";

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = headers().get("x-pathname") || "";

  return (
    <html lang="ok">
      <head>
        {pathname === "/coffee-chat" || pathname === "/coffee-chat/" ? (
          <>
            <link
              rel="preload"
              as="image"
              href="https://divopsor.github.io/blog-images/coffee-chat-background-wide-light.png"
            />
            <link
              rel="preload"
              as="image"
              href="https://divopsor.github.io/blog-images/profile-20240823.jpg"
            />
          </>
        ) : null}
        <style>
          {`
            :root {
              --color-primary: #000000;
              --color-opposite: #ffffff;
            }
            body {
              font-family: Noto Sans KR, sans-serif;
              margin: 0;
              padding: 0;
            }
          `}
        </style>
      </head>

      <body
        style={
          pathname === "/coffee-chat" || pathname === "/coffee-chat/"
            ? {
                backgroundImage:
                  "url(https://divopsor.github.io/blog-images/coffee-chat-background-wide-light.png)",
                backgroundSize: "100% 110vh",
                backgroundColor: "rgb(19, 24, 32)",
              }
            : {
              minWidth: "1200px",
            }
        }
      >
        {children}
      </body>
    </html>
  );
}
