const container = document.querySelector('.app') as HTMLElement;

//TODO FIX
const TechPage = () => {
  const template = `
  <h1>개발</h1>
  <section>Tech Page</section>
  `;
  return (container.innerHTML = template);
};

const DesignPage = () => {
  const template = `
  <h1>디자인</h1>
  <section>Design Page</section>
  `;
  return (container.innerHTML = template);
};

const DetailPage = (params) => {
  const template = `
  <h1>${params.id}</h1>
  <section>Detail Page</section>
  `;
  return (container.innerHTML = template);
};

const pages = {
  tech: TechPage,
  design: DesignPage,
  detail: DetailPage,
};

export default pages;
