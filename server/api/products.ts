// Definition des Anhänger-Typs
type Trailer = {
    type: string;
    name: string;
    id: number;
    costs: number;
    plate: string;
    capacity: number; // Korrigiert: `capacity` sollte ein Zahlentyp sein
    picture: string; // Optional: Bild des Anhängers
  };

export default defineEventHandler(async (event) => {

    const list: Trailer[] = [
        { type: "PKW-Anhänger", name: "T42-e", id: 1, costs: 40.0, plate: "AE-CE-ED", capacity: 9 , picture: "/products/Mueller-logo.png"},
        { type: "PKW-Anhänger", name: "T42-f", id: 2, costs: 50.0, plate: "AE-CF-ED", capacity: 12, picture: "/products/Mueller-logo.png"},
        { type: "PKW-Anhänger", name: "T42-g", id: 3, costs: 45.0, plate: "AE-CG-ED", capacity: 10, picture: "/products/Mueller-logo.png"}
    ];

    return list;
});