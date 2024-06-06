class RelatorioCatMesDTO {
  data: {
    Ano: number;
    Janeiro: {
      categorias: [
        {
          name: string;
          number: number;
        }
      ];
    };
    Fevereiro: {
      categorias: [
        {
          name: string;
          number: number;
        }
      ];
    };
    Marco: {
      categorias: [
        {
          name: string;
          number: number;
        }
      ];
    };
    Abril: {
      categorias: [
        {
          name: string;
          number: number;
        }
      ];
    };
    Maio: {
      categorias: [
        {
          name: string;
          number: number;
        }
      ];
    };
    Junho: {
      categorias: [
        {
          name: string;
          number: number;
        }
      ];
    };
    Julho: {
      categorias: [
        {
          name: string;
          number: number;
        }
      ];
    };
    Agosto: {
      categorias: [
        {
          name: string;
          number: number;
        }
      ];
    };
    Setembro: {
      categorias: [
        {
          name: string;
          number: number;
        }
      ];
    };
    Outubro: {
      categorias: [
        {
          name: string;
          number: number;
        }
      ];
    };
    Novembro: {
      categorias: [
        {
          name: string;
          number: number;
        }
      ];
    };
    Dezembro: {
      categorias: [
        {
          name: string;
          number: number;
        }
      ];
    };
  };
  generatedAt: string;

  constructor(data: any) {
    this.data = data;
    this.generatedAt = new Date().toISOString();
  }
}

export { RelatorioCatMesDTO };
