import { match } from "@formatjs/intl-localematcher";
import { Negotiator } from "negotiator";
import { NextResponse } from "next/server";

let locales = ["bn", "en"];
let defaultLocale = "bn";

function getLocale(request) {
  const acceptLanguage = request.headers.get("accept-language") ?? undefined;

  let headers = { "accept-language": acceptLanguage };

  let languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale);
}

export function middleware(request) {
  const pathname = request.nextUrl.pathname;

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: ["/((?!api|assets|.*\\..*|_next).*)"],
};
