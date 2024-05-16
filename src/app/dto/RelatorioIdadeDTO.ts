class RelatorioIdadeDTO {
  data: {
    till_30: number;
    btwn_30_50: number;
    over_50: number;
  };
  generatedAt: string;

  constructor(data: any) {
    this.data = data;
    this.generatedAt = new Date().toISOString();
  }
}

export { RelatorioIdadeDTO };
