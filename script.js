document.getElementById('ano').textContent = new Date().getFullYear();

/* Nav */
const nav = document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('solid',scrollY>40));

/* Mobile */
const hbg = document.getElementById('hbg');
const mobNav = document.getElementById('mobNav');
hbg.addEventListener('click',()=>{hbg.classList.toggle('open');mobNav.classList.toggle('open')});
function closeMob(){hbg.classList.remove('open');mobNav.classList.remove('open')}

/* Fade observer */
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting) e.target.classList.add('show')});
},{threshold:0.1});
document.querySelectorAll('.fade,.fade-l,.fade-r').forEach(el=>io.observe(el));

/* FAQ */
document.querySelectorAll('.faq-item').forEach(item=>{
  item.querySelector('.faq-q').addEventListener('click',()=>{
    const open = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i=>i.classList.remove('open'));
    if(!open) item.classList.add('open');
  });
});

/* Carousels */
const carData={
  s1:[
    {src:'img/notebook-antes.jpeg',  title:'Notebook recebido',          text:'Equipamento recebido para avaliação e manutenção.'},
    {src:'img/produtos-limpeza.jpeg',title:'Produtos utilizados',         text:'Materiais usados para limpeza e cuidado com o equipamento.'},
    {src:'img/manutencao-1.jpeg',    title:'Manutenção interna',          text:'Notebook aberto para verificação, limpeza e manutenção.'},
    {src:'img/manutencao-2.jpeg',    title:'Organização das peças',       text:'Serviço feito com cuidado e peças bem organizadas.'},
    {src:'img/notebook-depois.jpeg', title:'Notebook finalizado',         text:'Equipamento montado e pronto para os testes finais.'},
    {src:'img/notebook-ligado.jpeg', title:'Teste final',                 text:'Notebook ligado e testado após a manutenção.'},
    {src:'img/panfletos.jpeg',       title:'Serviço entregue ao cliente', text:'Finalização com agradecimento e cuidado na entrega.'}
  ],
  s2:[
    {src:'img/ram-smart.jpeg',           title:'Teste com memória Kingston', text:'Notebook LG ligava, porém não dava imagem com a memória Kingston.'},
    {src:'img/notebook-aberto-lg.jpeg',  title:'Diagnóstico notebook LG',    text:'Notebook aberto para análise do defeito de ausência de imagem.'},
    {src:'img/ram-kingston.jpeg',        title:'Teste com memória Smart',    text:'Memória Smart conectada para teste após falha da Kingston.'},
    {src:'img/notebook-lg-teclado.jpeg', title:'Botão power consertado',     text:'Botão de ligar/desligar reparado e funcionando novamente.'},
    {src:'img/notebook-lg-tampa.jpeg',   title:'Notebook LG finalizado',     text:'Notebook finalizado após correção do botão e testes de imagem.'}
  ]
};

document.querySelectorAll('.car-box').forEach(box=>{
  const slides = carData[box.dataset.car]; if(!slides) return;
  const img=box.querySelector('.car-img'),title=box.querySelector('.car-title'),
        text=box.querySelector('.car-text'),ctr=box.querySelector('.car-counter'),
        dotsEl=box.querySelector('.car-dots'),prev=box.querySelector('.prev'),next=box.querySelector('.next');
  let cur=0,timer;
  slides.forEach((_,i)=>{
    const d=document.createElement('span');
    d.className='c-dot'+(i===0?' active':'');
    d.addEventListener('click',()=>{goto(i);restart()});
    dotsEl.appendChild(d);
  });
  function update(){
    img.style.opacity='0';
    setTimeout(()=>{
      const s=slides[cur];
      img.src=s.src;title.textContent=s.title;text.textContent=s.text;
      ctr.textContent=`${cur+1} / ${slides.length}`;img.style.opacity='1';
      dotsEl.querySelectorAll('.c-dot').forEach((d,i)=>d.classList.toggle('active',i===cur));
    },220);
  }
  function goto(n){cur=((n%slides.length)+slides.length)%slides.length;update()}
  function restart(){clearInterval(timer);timer=setInterval(()=>goto(cur+1),5000)}
  prev.addEventListener('click',()=>{goto(cur-1);restart()});
  next.addEventListener('click',()=>{goto(cur+1);restart()});
  update();restart();
});