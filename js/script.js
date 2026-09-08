const IMG={
  cheese:'https://images.unsplash.com/photo-1452195100486-9cc805987862?auto=format&fit=crop&w=500&q=70',
  cheese2:'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=500&q=70',
  doce:'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=500&q=70',
  jam:'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=70',
  coffee:'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=500&q=70',
  coffeecup:'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=500&q=70',
  cachaca:'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?auto=format&fit=crop&w=500&q=70',
  sausage:'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=500&q=70',
  bread:'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=70',
  gift:'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=500&q=70'
};
const seloColor={CANASTRA:'#15803D','SELO ORIGEM':'#15803D','PREMIADO':'#D97706','PREMIADO EM VIÇOSA':'#D97706',ARTESANAL:'#9A3412',PRESENTE:'#D97706'};

const CATS=[
  {id:'todos',label:'Todos'},
  {id:'queijos',label:'Queijos'},
  {id:'doces',label:'Doces & Compotas'},
  {id:'cafes',label:'Cafés & Cachaças'},
  {id:'embutidos',label:'Embutidos'},
  {id:'kits',label:'Kits & Cestas'}
];
const CATCARDS=[
  {id:'queijos',title:'Queijos Premiados',e:'🧀',img:IMG.cheese},
  {id:'doces',title:'Doces & Compotas',e:'🍮',img:IMG.doce},
  {id:'cafes',title:'Cafés Especiais',e:'☕',img:IMG.coffee},
  {id:'cafes',title:'Cachaças & Licores',e:'🥃',img:IMG.cachaca}
];

const P=[
  {n:'Queijo Canastra Meia Cura',u:'Peça 500g',price:60,cat:'queijos',selo:'CANASTRA',e:'🧀',img:IMG.cheese},
  {n:'Queijo Coalho Du Norte',u:'Peça 400g',price:48,cat:'queijos',selo:'ARTESANAL',e:'🧀',img:IMG.cheese2},
  {n:'Colonial da Serra da Abelha',u:'Peça 500g',price:58,cat:'queijos',selo:'ARTESANAL',e:'🧀',img:IMG.cheese},
  {n:'Requeijão do Norte',u:'Pote 350g',price:56,cat:'queijos',selo:'ARTESANAL',e:'🧀',img:IMG.cheese2},
  {n:'Doce de Leite Cremoso de Viçosa',u:'Pote 410g',price:32,cat:'doces',selo:'PREMIADO EM VIÇOSA',e:'🍮',img:IMG.doce},
  {n:'Goiabada Cascão da Roça',u:'Barra 600g',price:28,cat:'doces',selo:'ARTESANAL',e:'🍬',img:IMG.jam},
  {n:'Compota de Figo em Calda',u:'Pote 300g',price:38,cat:'doces',selo:'ARTESANAL',e:'🫙',img:IMG.jam},
  {n:'Compota de Doce de Leite',u:'Pote 400g',price:44,cat:'doces',selo:'ARTESANAL',e:'🍮',img:IMG.doce},
  {n:'Café Especial Torrado na Fazenda',u:'Pacote 500g',price:46,cat:'cafes',selo:'PREMIADO',e:'☕',img:IMG.coffee},
  {n:'Café Coado Tradicional Moído',u:'Pacote 500g',price:34,cat:'cafes',selo:'ARTESANAL',e:'☕',img:IMG.coffeecup},
  {n:'Cachaça Envelhecida em Jequitibá',u:'Garrafa 700ml',price:119,cat:'cafes',selo:'ARTESANAL',e:'🥃',img:IMG.cachaca},
  {n:'Licor de Doce de Leite',u:'Garrafa 500ml',price:45,cat:'cafes',selo:'ARTESANAL',e:'🥃',img:IMG.cachaca},
  {n:'Salame Artesanal da Canastra',u:'Peça 400g',price:38,cat:'embutidos',selo:'CANASTRA',e:'🥓',img:IMG.sausage},
  {n:'Lombo Canastra Defumado',u:'Peça 400g',price:54,cat:'embutidos',selo:'ARTESANAL',e:'🥓',img:IMG.sausage},
  {n:'Linguiça Artesanal Defumada',u:'Peça 500g',price:39,cat:'embutidos',selo:'ARTESANAL',e:'🌭',img:IMG.sausage},
  {n:'Kit Café da Manhã Mineiro',u:'Cesta completa',price:189,cat:'kits',selo:'SELO ORIGEM',e:'🎁',img:IMG.gift},
  {n:'Kit Tábua de Frios & Cachaça',u:'Kit presente',price:229,cat:'kits',selo:'PRESENTE',e:'🎁',img:IMG.gift}
];
P.forEach((p,i)=>p.id=i);

const FREE_SHIP=200;
const brl=v=>'R$ '+v.toFixed(2).replace('.',',');
const cart={};
let state={cat:'todos',q:''};
let coupon=null;
let payMethod='pix';

document.getElementById('cat-cards').innerHTML=CATCARDS.map(c=>`
  <a href="#vitrine" onclick="setCat('${c.id}')" class="card press group relative rounded-2xl overflow-hidden h-44 lg:h-52 block">
    <div class="imgwrap h-full">
      <span class="emoji">${c.e}</span>
      <img src="${c.img}" onerror="this.remove()" alt="${c.title}">
      <div class="absolute inset-0" style="background:linear-gradient(to top,rgba(60,20,8,.85),rgba(60,20,8,.05));"></div>
    </div>
    <div class="absolute bottom-0 left-0 right-0 p-4">
      <p class="font-display font-semibold text-cream text-[18px] leading-tight">${c.title}</p>
      <span class="inline-flex items-center gap-1 text-cream/85 text-[12px] font-semibold mt-1">Ver produtos
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FDFBF7" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </span>
    </div>
  </a>`).join('');

function renderFilters(){
  document.getElementById('filters').innerHTML=CATS.map(c=>`
    <button class="press px-4 py-2 rounded-full text-[13px] font-semibold border transition ${c.id===state.cat?'bg-terracota text-cream border-terracota':'bg-white text-tijolo border-creme2 hover:border-ambar'}"
      onclick="setCat('${c.id}')">${c.label}</button>`).join('');
}
function setCat(id){ state.cat=id; renderFilters(); renderGrid(); }
function setQuery(q){ state.q=q.toLowerCase(); renderGrid(); }

function renderGrid(){
  let items=P.filter(p=>(state.cat==='todos'||p.cat===state.cat)&&(!state.q||p.n.toLowerCase().includes(state.q)));
  const t=CATS.find(c=>c.id===state.cat);
  document.getElementById('vitrine-title').textContent=state.cat==='todos'?'Todos os produtos':t.label;
  document.getElementById('empty').classList.toggle('hidden',items.length>0);
  document.getElementById('grid').innerHTML=items.map(p=>`
    <div class="card bg-cardbg rounded-2xl overflow-hidden border border-creme2 flex flex-col">
      <div class="imgwrap aspect-square">
        <span class="emoji">${p.e}</span>
        <img src="${p.img}" onerror="this.remove()" alt="${p.n}" loading="lazy">
        <span class="selo absolute top-2.5 left-2.5" style="color:${seloColor[p.selo]||'#9A3412'}">
          <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 5.8L20 8l-4.5 4L17 18l-5-3.2L7 18l1.5-6L4 8l5.6-.2z"/></svg>${p.selo}
        </span>
      </div>
      <div class="p-3.5 flex flex-col flex-1">
        <h3 class="font-semibold text-tinta text-[13.5px] leading-snug flex-1">${p.n}</h3>
        <p class="text-[11.5px] text-tinta/50 mt-0.5">${p.u}</p>
        <div class="flex items-center justify-between mt-3">
          <span class="font-display font-semibold text-tijolo text-[18px]">${brl(p.price)}</span>
        </div>
        <button class="press w-full mt-2.5 bg-tijolo hover:bg-terracota text-cream text-[13px] font-semibold py-2.5 rounded-full flex items-center justify-center gap-1.5" onclick="addToCart(${p.id})">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#FDFBF7" stroke-width="2.2"><path d="M6 8h12l-1 12H7L6 8z" stroke-linejoin="round"/><path d="M9 8V6a3 3 0 016 0v2"/></svg>
          Adicionar à sacola
        </button>
      </div>
    </div>`).join('');
}

function count(){return Object.values(cart).reduce((a,q)=>a+q,0);}
function subtotal(){return Object.entries(cart).reduce((a,[id,q])=>a+P[id].price*q,0);}
function updateBadge(){const n=count(),b=document.getElementById('cart-badge');b.textContent=n;b.style.display=n>0?'flex':'none';}
function addToCart(id){cart[id]=(cart[id]||0)+1;updateBadge();renderDrawer();showToast(P[id].n.split(' ').slice(0,2).join(' ')+' na sacola');flashCart();}
function changeQty(id,d){cart[id]=(cart[id]||0)+d;if(cart[id]<=0)delete cart[id];updateBadge();renderDrawer();}
function flashCart(){const d=document.getElementById('drawer');if(!d.classList.contains('open'))openCart();}

function renderDrawer(){
  const n=count();
  const items=document.getElementById('drawer-items');
  const foot=document.getElementById('drawer-foot');
  const empty=document.getElementById('drawer-empty');
  const shipbar=document.getElementById('ship-bar');
  if(n===0){
    items.style.display='none';foot.style.display='none';shipbar.style.display='none';
    empty.style.display='flex';document.getElementById('drawer-sub').textContent='Confira seus itens';
    return;
  }
  items.style.display='block';foot.style.display='block';shipbar.style.display='block';empty.style.display='none';
  document.getElementById('drawer-sub').textContent=n+(n===1?' item':' itens');

  items.innerHTML=Object.entries(cart).map(([id,q])=>{
    const p=P[id];
    return `<div class="flex gap-3 py-3 border-b border-creme2">
      <div class="imgwrap w-[70px] h-[70px] rounded-xl flex-shrink-0">
        <span class="emoji" style="font-size:26px">${p.e}</span>
        <img src="${p.img}" onerror="this.remove()" alt="">
      </div>
      <div class="flex-1 min-w-0">
        <div class="flex justify-between gap-2">
          <p class="text-[13px] font-semibold text-tinta leading-tight">${p.n}</p>
          <button class="text-tinta/40 hover:text-terracota flex-shrink-0" onclick="removeItem(${id})" aria-label="Remover">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/></svg>
          </button>
        </div>
        <p class="text-[11px] text-tinta/50">${p.u}</p>
        <div class="flex items-center justify-between mt-1.5">
          <span class="font-display font-semibold text-tijolo text-[14px]">${brl(p.price*q)}</span>
          <div class="flex items-center gap-2.5 bg-cream rounded-full px-1 py-0.5 border border-creme2">
            <button class="press w-6 h-6 rounded-full flex items-center justify-center" onclick="changeQty(${id},-1)"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7C2D12" stroke-width="2.6"><path d="M5 12h14" stroke-linecap="round"/></svg></button>
            <span class="text-[13px] font-bold text-tijolo w-4 text-center">${q}</span>
            <button class="press w-6 h-6 rounded-full flex items-center justify-center" onclick="changeQty(${id},1)"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#7C2D12" stroke-width="2.6"><path d="M12 5v14M5 12h14" stroke-linecap="round"/></svg></button>
          </div>
        </div>
      </div>
    </div>`;
  }).join('');

  const sub=subtotal();
  const pct=Math.min(100,sub/FREE_SHIP*100);
  document.getElementById('ship-fill').style.width=pct+'%';
  document.getElementById('ship-msg').innerHTML = sub>=FREE_SHIP
    ? '🎉 <b class="text-oliva">Você ganhou frete grátis!</b>'
    : `Faltam <b class="text-terracota">${brl(FREE_SHIP-sub)}</b> para o frete grátis`;

  updateTotals();
}
function removeItem(id){delete cart[id];updateBadge();renderDrawer();}

function updateTotals(){
  const sub=subtotal();
  document.getElementById('sub-val').textContent=brl(sub);
  let desc=0;const row=document.getElementById('desc-row');
  if(coupon){desc=sub*coupon.rate;document.getElementById('desc-label').textContent='Cupom '+coupon.code;document.getElementById('desc-val').textContent='- '+brl(desc);row.classList.remove('hidden');}
  else row.classList.add('hidden');
  document.getElementById('total-val').textContent=brl(Math.max(0,sub-desc));
}
function applyCoupon(){
  const code=document.getElementById('coupon').value.trim();
  const msg=document.getElementById('coupon-msg');msg.classList.remove('hidden');
  const valid={UAI10:0.10,MINAS15:0.15};
  if(valid[code]){coupon={code,rate:valid[code]};msg.textContent='Cupom aplicado: '+(valid[code]*100)+'% de desconto.';msg.className='text-[11.5px] mb-2 text-oliva font-semibold';showToast('Cupom '+code+' aplicado');}
  else{coupon=null;msg.textContent='Cupom inválido. Tente UAI10.';msg.className='text-[11.5px] mb-2 text-terracota font-semibold';}
  updateTotals();
}

function openCart(){document.getElementById('drawer').classList.add('open');document.getElementById('backdrop').classList.add('open');}
function closeCart(){document.getElementById('drawer').classList.remove('open');document.getElementById('backdrop').classList.remove('open');}

function openCheckout(){
  if(count()===0)return;
  const sub=subtotal();const desc=coupon?sub*coupon.rate:0;const total=Math.max(0,sub-desc);
  renderCheckout(total);
  document.getElementById('checkout').classList.add('open');
}
function closeCheckout(){document.getElementById('checkout').classList.remove('open');}
function renderCheckout(total){
  document.getElementById('checkout-box').innerHTML=`
    <div class="p-6">
      <div class="flex items-center justify-between">
        <h3 class="font-display font-semibold text-tijolo text-[21px]">Finalizar compra</h3>
        <button class="press w-8 h-8 rounded-full bg-creme2 flex items-center justify-center" onclick="closeCheckout()"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C2D12" stroke-width="2.4"><path d="M6 6l12 12M18 6L6 18" stroke-linecap="round"/></svg></button>
      </div>
      <p class="text-[13px] text-tinta/60 mt-1">Total a pagar <span class="font-display font-semibold text-tijolo text-[17px] ml-1">${brl(total)}</span></p>

      <div class="grid grid-cols-2 gap-3 mt-5">
        <button id="pay-pix" class="press rounded-2xl border-2 border-oliva bg-oliva/5 p-3.5 text-left" onclick="selectPay('pix')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#15803D"><path d="M12 2l3 3-3 3-3-3 3-3zm-7 7l3-3 3 3-3 3-3-3zm14 0l-3-3-3 3 3 3 3-3zm-7 7l-3-3 3-3 3 3-3 3z"/></svg>
          <p class="text-[14px] font-bold text-tijolo mt-1.5">Pix</p><p class="text-[11px] text-oliva font-semibold">Aprovação na hora</p>
        </button>
        <button id="pay-card" class="press rounded-2xl border-2 border-creme2 bg-white p-3.5 text-left" onclick="selectPay('card')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9A3412" stroke-width="1.8"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M3 10h18"/></svg>
          <p class="text-[14px] font-bold text-tijolo mt-1.5">Cartão</p><p class="text-[11px] text-tinta/50 font-semibold">Em até 6x</p>
        </button>
      </div>
      <div id="pay-detail" class="mt-5"></div>
      <button class="press w-full mt-5 bg-terracota text-cream font-bold text-[15px] py-3.5 rounded-full" onclick="confirmPay(${total})">Confirmar pagamento</button>
      <p class="text-center text-[11px] text-tinta/45 mt-3">🔒 Ambiente simulado. Nenhuma cobrança é feita.</p>
    </div>`;
  selectPay('pix');
}
function selectPay(m){
  payMethod=m;
  document.getElementById('pay-pix').className='press rounded-2xl border-2 p-3.5 text-left '+(m==='pix'?'border-oliva bg-oliva/5':'border-creme2 bg-white');
  document.getElementById('pay-card').className='press rounded-2xl border-2 p-3.5 text-left '+(m==='card'?'border-terracota bg-terracota/5':'border-creme2 bg-white');
  const box=document.getElementById('pay-detail');
  if(m==='pix'){
    const code='00020126360014BR.GOV.BCB.PIX0114+55119966146815204000053039865802BR5925DELICIAS AQUI DELICIAS ACO6006COTIA62070503***6304A1B2';
    box.innerHTML=`<div class="bg-creme2/50 rounded-2xl p-4 text-center">
      <div class="w-32 h-32 mx-auto rounded-xl bg-white p-2 border border-creme2">${qrSvg()}</div>
      <p class="text-[11.5px] text-tinta/60 mt-3">Pix Copia e Cola</p>
      <div class="mt-1.5 bg-white border border-creme2 rounded-xl p-2 flex items-center gap-2">
        <span class="text-[9.5px] text-tinta/70 truncate flex-1 text-left font-mono">${code.slice(0,36)}…</span>
        <button class="press bg-oliva text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg flex-shrink-0" onclick="copyPix('${code}')">Copiar</button>
      </div>
    </div>`;
  }else{
    box.innerHTML=`<div class="space-y-2.5">
      <input class="w-full bg-white border border-creme2 rounded-xl px-3 py-2.5 text-[13px] outline-none focus:border-ambar" placeholder="Número do cartão" inputmode="numeric">
      <div class="flex gap-2.5">
        <input class="flex-1 bg-white border border-creme2 rounded-xl px-3 py-2.5 text-[13px] outline-none focus:border-ambar" placeholder="Validade">
        <input class="w-24 bg-white border border-creme2 rounded-xl px-3 py-2.5 text-[13px] outline-none focus:border-ambar" placeholder="CVV">
      </div>
      <input class="w-full bg-white border border-creme2 rounded-xl px-3 py-2.5 text-[13px] outline-none focus:border-ambar" placeholder="Nome impresso no cartão">
      <select class="w-full bg-white border border-creme2 rounded-xl px-3 py-2.5 text-[13px] outline-none focus:border-ambar text-tinta/80">
        <option>1x sem juros</option><option>2x sem juros</option><option>3x sem juros</option><option>6x sem juros</option>
      </select>
    </div>`;
  }
}
function qrSvg(){
  let cells='';const seed=[1,0,1,1,0,1,0,0,1,1,0,0,1,0,1,1,1,0,1,0,0,1,1,0,1];
  for(let y=0;y<11;y++)for(let x=0;x<11;x++){
    const on=(x*7+y*3+seed[(x+y)%25])%3===0||(x<3&&y<3)||(x>7&&y<3)||(x<3&&y>7);
    if(on)cells+=`<rect x="${x*9}" y="${y*9}" width="9" height="9"/>`;
  }
  return `<svg viewBox="0 0 99 99" width="100%" height="100%" fill="#2A211A">${cells}</svg>`;
}
function copyPix(code){
  const done=()=>showToast('Código Pix copiado');
  if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(code).then(done).catch(done);
  else{const t=document.createElement('textarea');t.value=code;document.body.appendChild(t);t.select();try{document.execCommand('copy')}catch(e){}document.body.removeChild(t);done();}
}
function confirmPay(total){
  document.getElementById('checkout-box').innerHTML=`
    <div class="p-8 text-center">
      <div class="w-20 h-20 mx-auto rounded-full bg-oliva/12 flex items-center justify-center">
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#15803D" stroke-width="2.4"><path d="M5 13l4 4L19 7" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <h3 class="font-display font-semibold text-tijolo text-[22px] mt-4">Pedido confirmado!</h3>
      <p class="text-[13.5px] text-tinta/65 mt-2 leading-snug">Recebemos seu pagamento de <b class="text-tijolo">${brl(total)}</b> via ${payMethod==='pix'?'Pix':'cartão'}. Já estamos preparando suas delícias com carinho.</p>
      <div class="bg-creme2/50 rounded-2xl p-3 mt-4 flex items-center gap-3 text-left">
        <span class="text-[26px]">🚚</span>
        <div><p class="text-[12.5px] font-semibold text-tijolo">Pedido #${2042+Math.floor(Math.random()*50)}</p><p class="text-[11.5px] text-tinta/55">Enviado em embalagem térmica</p></div>
      </div>
      <button class="press w-full mt-5 bg-tijolo text-cream font-bold text-[15px] py-3.5 rounded-full" onclick="finishOrder()">Continuar comprando</button>
    </div>`;
}
function finishOrder(){
  for(const k in cart)delete cart[k];coupon=null;
  document.getElementById('coupon').value='';document.getElementById('coupon-msg').classList.add('hidden');
  updateBadge();renderDrawer();closeCheckout();closeCart();
  showToast('Uai, obrigado pela preferência!');
}

function toggleMenu(){document.getElementById('mobmenu').classList.toggle('open');}
function subscribe(e){e.preventDefault();e.target.reset();showToast('Pronto! Use o cupom UAI10 na primeira compra.');}
let tt;function showToast(m){const t=document.getElementById('toast');t.textContent=m;t.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('show'),1900);}

const header=document.getElementById('header');
window.addEventListener('scroll',()=>header.classList.toggle('shrink',window.scrollY>10));
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}}),{threshold:.12});
document.querySelectorAll('.fadeup').forEach(el=>io.observe(el));

renderFilters();renderGrid();renderDrawer();updateBadge();
