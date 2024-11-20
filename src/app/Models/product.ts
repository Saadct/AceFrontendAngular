export class Product {
    id: string;
    nom: string;
    description: string;
    prix: number;
    quantiteEnStock: number;
    dateAjout: string;
  
    constructor(
      id: string,
      nom: string,
      description: string,
      prix: number,
      quantiteEnStock: number,
      dateAjout: string
    ) {
      this.id = id;
      this.nom = nom;
      this.description = description;
      this.prix = prix;
      this.quantiteEnStock = quantiteEnStock;
      this.dateAjout = dateAjout;
    }
  }
  