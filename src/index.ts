import './index.css';
import Router from './router/index';

const container = document.querySelector('.app') as HTMLElement;
const h1 = document.querySelector('h1') as HTMLElement;
const button = document.querySelectorAll(
  'button'
) as NodeListOf<HTMLButtonElement>;

const pages = {
  tech: () => (h1.innerText = 'tech page'),
  design: () => (h1.innerText = 'design page'),
  board: (params) => (container.innerText = `${params.id}`),
};

const router = new Router();

router
  .addRoute('#/', pages.tech)
  .addRoute('#/tech', pages.tech)
  .addRoute('#/tech/:id', pages.board)
  .addRoute('#/design', pages.design)
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

// window.addEventListener('click', (event: MouseEvent) => {
//   const target = event.target as HTMLElement;
//   console.log('target', target);
//   if (target.matches('[data-navigate]')) {
//     router.navigate(target.dataset.navigate as string);
//   }
// });
