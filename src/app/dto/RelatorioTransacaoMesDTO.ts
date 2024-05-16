class RelatorioTransacaoMesDTO {
  data: {
    Ano: number;
    Janeiro: {
      doacao: number;
      emprestimo: number;
      troca: number;
      venda: number;
    };
    Fevereiro: {
      doacao: number;
      emprestimo: number;
      troca: number;
      venda: number;
    };
    Marco: {
      doacao: number;
      emprestimo: number;
      troca: number;
      venda: number;
    };
    Abril: {
      doacao: number;
      emprestimo: number;
      troca: number;
      venda: number;
    };
    Maio: {
      doacao: number;
      emprestimo: number;
      troca: number;
      venda: number;
    };
    Junho: {
      doacao: number;
      emprestimo: number;
      troca: number;
      venda: number;
    };
    Julho: {
      doacao: number;
      emprestimo: number;
      troca: number;
      venda: number;
    };
    Agosto: {
      doacao: number;
      emprestimo: number;
      troca: number;
      venda: number;
    };
    Setembro: {
      doacao: number;
      emprestimo: number;
      troca: number;
      venda: number;
    };
    Outubro: {
      doacao: number;
      emprestimo: number;
      troca: number;
      venda: number;
    };
    Novembro: {
      doacao: number;
      emprestimo: number;
      troca: number;
      venda: number;
    };
    Dezembro: {
      doacao: number;
      emprestimo: number;
      troca: number;
      venda: number;
    };
  };
  generatedAt: string;

  constructor(data: any) {
    this.data = data;
    this.generatedAt = new Date().toISOString();
  }
}

export { RelatorioTransacaoMesDTO };
