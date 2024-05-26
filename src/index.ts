import './index.css';
import pages from './pages';
import Router from './router/index';

const button = document.querySelectorAll('button') as NodeListOf<HTMLButtonElement>;

const router = new Router();

router
  .addRoute('/', pages.tech)
  .addRoute('/tech', pages.tech)
  .addRoute('/tech/:id', pages.detail)
  .addRoute('/design', pages.design)
  .start();

const movePage = (event: MouseEvent) => {
  const target = event.target as HTMLButtonElement;
  if (target.matches('[data-navigate]')) {
    router.navigate(target.dataset.navigate as string);
  }
};

button.forEach((btn) => {
  btn.addEventListener('click', movePage);
});