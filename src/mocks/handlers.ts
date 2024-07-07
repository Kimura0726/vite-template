import { http, HttpResponse, delay } from 'msw';
import { qiitaUrl, loginUrl } from '@/URLs';
import type { account } from '@/types/user';
import { qiita, testUser } from './test-data';

export const handlers = [
  http.get(qiitaUrl, ({ request }) => {
    console.log(request.method, request.url);
    return HttpResponse.json(qiita);
  }),
  http.post(loginUrl, async ({ request }) => {
    const { id, pw } = (await request.json()) as account;
    await delay(3000);

    // テストユーザーとの突合
    if (id != testUser.id || pw != testUser.pw) {
      return new HttpResponse(null, { status: 401 });
    }

    return new HttpResponse(null, {
      headers: {
        // Setting the "Set-Cookie" mocked response header
        // will forward these cookies onto "document" as if they
        // were sent from the server.
        'Set-Cookie': 'authToken=abc-123'
      }
    });
  })
];
