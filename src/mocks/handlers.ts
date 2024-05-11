import { http, HttpResponse } from 'msw';
import { qiitaUrl } from '@/URLs';
import { qiita } from './test-data';

export const handlers = [
  http.get(qiitaUrl, () => {
    console.log('qiita');
    // return HttpResponse.error();
    // return new HttpResponse(null, { status: 401 });
    return HttpResponse.json(qiita);
  })
];
