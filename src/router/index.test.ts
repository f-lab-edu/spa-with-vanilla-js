import pages from '@/pages';
import Router from './index';

describe('router 동작 테스트', () => {
  const router = new Router();
  router
    .addRoute('/', pages.tech)
    .addRoute('/tech', pages.tech)
    .addRoute('/tech/:id', pages.detail)
    .addRoute('/design', pages.design);

  test('addRoute로 추가한 경로의 수가 일치한다.', () => {
    expect(router.routes.length).toBe(4);
  });
});
