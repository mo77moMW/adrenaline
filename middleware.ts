import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // تشغيل الحماية فقط على مسار الداش بورد
  if (request.nextUrl.pathname.startsWith('/dashbord')) {
    
    const authHeader = request.headers.get('authorization');

    if (authHeader) {
      const auth = authHeader.split(' ')[1];
      const [user, password] = atob(auth).split(':');

      // تحديد اسم مستخدم وباسورد ثابتين كحياطة، أو القراءة من الـ env
      const SECURE_USER = process.env.DASHBOARD_USER || "admin";
      const SECURE_PASS = process.env.DASHBOARD_PASSWORD || "123456"; // حط الباسورد اللي بدك إياه هون مباشرة

      if (user === SECURE_USER && password === SECURE_PASS) {
        return NextResponse.next();
      }
    }

    // إظهار نافذة طلب الباسورد للمتصفح
    return new NextResponse('Authentication Required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Dashboard"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/dashbord/:path*',
};