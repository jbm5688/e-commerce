
// Simple EMVCo Pix payload generator + QR rendering (uses qrcodejs from CDN on pages)
export function emvPix({chave, nome, cidade, valor, txid='ECOMMERCE'}){
  function pad2(n){ return n<10?'0'+n:''+n; }
  function tlv(id, value){ const len = pad2(new TextEncoder().encode(value).length); return id + len + value; }
  const gui = tlv('00','br.gov.bcb.pix');
  const chaveTLV = tlv('01',chave);
  const desc = ''; // optional: tlv('02','Compra');
  const mai = tlv('26', gui + chaveTLV + desc);
  const mcc = tlv('52','0000');
  const cur = tlv('53','986');
  const v = valor ? tlv('54', Number(valor).toFixed(2)) : '';
  const cc = tlv('58','BR');
  const nm = tlv('59',(nome||'LOJA ONLINE').slice(0,25));
  const ct = tlv('60',(cidade||'FORTALEZA').slice(0,15).toUpperCase());
  const add = tlv('62', tlv('05',(txid||'ECOMMERCE') .slice(0,25)));
  const base = '000201' + tlv('01','12') + mai + mcc + cur + v + cc + nm + ct + add + '6304';
  // CRC16/CCITT
  function crc16(str){
    const data = new TextEncoder().encode(str);
    let crc = 0xFFFF;
    for(let b of data){
      crc ^= (b << 8);
      for(let i=0;i<8;i++){
        if((crc & 0x8000)!==0){ crc = (crc << 1) ^ 0x1021; } else { crc <<= 1; }
        crc &= 0xFFFF;
      }
    }
    return crc.toString(16).toUpperCase().padStart(4,'0');
  }
  return base + crc16(base);
}

export function renderPixQR(canvasEl, payload){
  if(!window.QRCode){ console.warn('QRCode lib ausente'); return; }
  // Clear container
  canvasEl.innerHTML = '';
  new QRCode(canvasEl, { text: payload, width: 256, height: 256 });
}
