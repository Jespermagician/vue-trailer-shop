// server/api/cart.ts

let cartData: any[] = [];  // In-Memory Speicherung der Cart-Daten

export default defineEventHandler(async (event) => {
  // Lese den Body der Anfrage (wird nur für POST benötigt)
  const body = await readBody(event);

  if (event.req.method === 'POST') {
    console.log('Received data:', body);
    cartData.push(body);  // Speichert die empfangenen Daten in cartData
    return { success: true, message: 'Data received', data: body };
  }

  // GET-Anfrage: Rückgabe der aktuellen cartData
  if (event.req.method === 'GET') {
    console.log('Returning cart data:', cartData);
    return { success: true, message: 'Cart data retrieved', data: cartData };
  }

  // Rückgabe für ungültige Methoden
  return { success: false, message: 'Invalid request' };
});
