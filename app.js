
import { PRODUTOS } from './data.js';

const moneyBR = v => v.toLocaleString('pt-BR', {style:'currency', currency:'BRL'});
const byId = (id)=>document.getElementById(id);
const q = (sel,el=document)=>el.querySelector(sel);
const qa = (sel,el=document)=>Array.from(el.querySelectorAll(sel));

// CART
const CART_KEY = 'cart_v1';
export const getCart = ()=> JSON.parse(localStorage.getItem(CART_KEY) || '[]');
export const saveCart = (c)=> localStorage.setItem(CART_KEY, JSON.stringify(c));
export const addToCart = (id, qty=1)=>{
  const c = getCart();
  const idx = c.findIndex(i=>i.id===id);
  if(idx>=0){ c[idx].qty += qty; } else { c.push({id, qty}); }
  saveCart(c); updateCartCount();
}
export const removeFromCart = (id)=>{ saveCart(getCart().filter(i=>i.id!==id)); updateCartCount(); }
export const updateQty = (id, qty)=>{
  const c = getCart().map(i=> i.id===id ? {...i, qty: Math.max(1, qty)} : i);
  saveCart(c);
}
export const cartTotal = ()=> getCart().reduce((acc,i)=>{
  const p = PRODUTOS.find(p=>p.id===i.id); return acc + (p.preco * i.qty);
},0);

export function updateCartCount(){
  const c = getCart().reduce((a,i)=>a+i.qty,0);
  qa('[data-cart-count]').forEach(el=> el.textContent = c);
}

window.store = { PRODUTOS, getCart, saveCart, addToCart, removeFromCart, updateQty, cartTotal, moneyBR, updateCartCount };
document.addEventListener('DOMContentLoaded', updateCartCount);
