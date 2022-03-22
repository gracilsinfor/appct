const dados_teste = {
        cabecalhos: ['Tempo','Carro','Condutor','Tipo'], 
        carros: ['Carro 1','Carro 2','Carro 3','Carro 4'],
        condutores: ['Condutor 1','Condutor 2','Condutor 3','Condutor 4'],
        frontespicio: [['A1','A2','A3','A4'],['B1','B2','B3','B4'],['C1','C2','C3','C4'],['D1','D2','D3','D4'],['E1','E2','E3','E4']],
        tipos: ['Motor Elétrico','Motor Térmico']
    };

const cabecalhos = {cabecalhos: "['Tempo','Carro','Condutor','Tipo']"};

const carros = ['Carro 1','Carro 2','Carro 3','Carro 4'];

const condutores = {condutores: "['Condutor 1','Condutor 2','Condutor 3','Condutor 4']"};

const frontespicio = {frontespicio: "[['D1','D2','D3','D4'],['D1','D2','D3','D4'],['D1','D2','D3','D4'],['D1','D2','D3','D4'],['D1','D2','D3','D4']]"};

const tipos = {tipos: "['Motor Elétrico','Motor Térmico']"};

module.exports = {
    dados_teste,
    cabecalhos,
    carros,
    condutores,
    frontespicio,
    tipos
}