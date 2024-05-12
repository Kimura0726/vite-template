import { http, HttpResponse } from 'msw';
import { qiitaUrl } from '@/URLs';
import { qiita } from './test-data';

export const handlers = [
  http.get(qiitaUrl, ({ request }) => {
    console.log(request.method, request.url);
    // delay(100);
    // return HttpResponse.error();
    // return new HttpResponse(null, { status: 401 });
    return HttpResponse.json(qiita);
  })
];
