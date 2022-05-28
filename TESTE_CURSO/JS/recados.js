const form = document.querySelector('infos-prod');
const tabela = document.querySelector('tbody');

//SALVAR NO LOCALSTORAGE
const atualizarLocalStorage = (produtos)  =>{localStorage.setItem('produtos', JSON.stringify(produtos))}

//RECUPERA OS PRODUTOS 
const recuperarLocalStorage = () =>  JSON.parse(localStorage.getItem('produtos') || '[]');

const salvarProduto = (e =>{
    e.preventDefault();
    console.log("salvando");
    //pegar os dados fo formulario
    const nome = form.nome.value;
    const preco = Number(form.preco.value);
    const prime = form.prime.checked;

    const produtos = recuperarLocalStorage();
    produtos.push({id:produtos.length + 1, nome, preco, prime})
    atualizarLocalStorage(produtos);
    preencherTabela();
    form.reset();
});

const preencherTabela = () =>{
    const produtos = recuperarLocalStorage();
    tabela.innerHTML = '';
    for(const produto of produtos){ 
        tabela.innerHTML += `
        <tr>
            <th scope="row">${produto.id}</th>
            <td>${produto.nome}</td> 
            <td>${produto.preco}</td> 
            <td>${produto.prime ? "sim" : "não"}</td>    
            <td>
                <img type="buttom" width="40" src="./img/remove.png" onclick="removerProduto(${produto.id})">
                <img type="buttom" width="40" src="./img/edit.png" onclick="atualizarProduto(${produto.id})>
            </td>    
        </tr>
        `;
    }
}

const removerProduto = (id) =>{
    const produtos = recuperarLocalStorage();
    const indexProduto = produtos.findIndex(produto => produto.id === id)
    console.log(produtos[indexProduto])

}

form.addEventListener('submit', salvarProduto);
document.addEventListener('DOMContentLoaded', preencherTabela);