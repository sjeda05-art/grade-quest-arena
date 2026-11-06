import { QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { GlobalStyle } from "../styles/GlobalStyle";
import * as S from "../components/AppFrame/AppFrame.style";

function NotFoundComponent() {
  return (
    <S.Fallback>
      <S.FallbackCode>404</S.FallbackCode>
      <S.FallbackTitle>이 던전은 존재하지 않아요</S.FallbackTitle>
      <S.FallbackText>주소가 바뀌었거나 사라진 페이지예요.</S.FallbackText>
      <S.FallbackButton as={Link} to="/home">
        홈으로
      </S.FallbackButton>
    </S.Fallback>
  );
}

function ErrorComponent({ error, reset }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <S.Fallback>
      <S.FallbackTitle>화면을 불러오지 못했어요</S.FallbackTitle>
      <S.FallbackText>잠시 후 다시 시도해 주세요.</S.FallbackText>
      <S.FallbackButton
        type="button"
        onClick={() => {
          router.invalidate();
          reset();
        }}
      >
        다시 시도
      </S.FallbackButton>
    </S.Fallback>
  );
}

export const Route = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "학점전선 - F급 용사의 반격" },
      { name: "description", content: "강의 계획표로 던전을 만들고 교수님을 토벌하는 학점 RPG" },
      { property: "og:title", content: "학점전선 - F급 용사의 반격" },
      { property: "og:description", content: "강의 계획표로 던전을 만들고 교수님을 토벌하는 학점 RPG" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Do+Hyeon&family=Jua&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }) {
  return (
    <html lang="ko">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  // styled-components 스타일은 브라우저에서 주입되므로, 화면이 준비된 뒤에 그립니다.
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  return (
    <QueryClientProvider client={queryClient}>
      {ready && (
        <>
          <GlobalStyle />
          <S.Frame>
            <Outlet />
          </S.Frame>
          <Toaster position="top-center" richColors />
        </>
      )}
    </QueryClientProvider>
  );
}
