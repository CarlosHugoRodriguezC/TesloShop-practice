import { getToken } from 'next-auth/jwt';
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
// import { jwt } from '../../utils';

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // console.log('session', session);

  if (!session)
    return NextResponse.redirect(
      `${req.nextUrl.origin}/auth/login?p=${req.page.name}`
    );
  // return {
  //   redirect: {
  //     destination: `/login?p=${req.page.name}`,
  //     permanent: false,
  //   },
  // };

  return NextResponse.next();

  // const { token = '' } = req.cookies;

  // try {
  //   // await jwt.isValid(token);
  //   return NextResponse.next();
  // } catch (error) {
  //   const url = req.nextUrl.clone();
  //   console.log(url.origin);
  //   const requestedPage = req.page.name;
  //   return NextResponse.redirect(`${url.origin}/auth/login?p=${requestedPage}`);
  // }
}
