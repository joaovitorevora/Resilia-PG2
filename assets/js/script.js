// Func to Init AOS and Counters effect on page load

$(document).ready(() => {
	if ('AOS' in window) {
		AOS.init();
	}

	let numberBusiness = Number($('#numberBusiness').text());
	numberBusiness = 480;
	let numberBusinessInterval = setInterval(() => {
		numberBusiness += 1;
		$('#numberBusiness').text(`+${numberBusiness}`);
		if (numberBusiness >= 500) {
			clearInterval(numberBusinessInterval);
		}
	}, 80);
});
// Contato -----------
const cards = document.querySelectorAll('.card');
cards.forEach((card) => {
	card.addEventListener('click', (e) => {
		card.classList.toggle('flip');
	});
});

// Lista de espera ----------

document.getElementById('pesquisarCEP');

function pesquisarCEP() {
	// Obtendo o valor do campo de entrada de CEP
	var cep = document.getElementById('cep').value;
	// Verificando se o CEP é válido
	if (cep != '' && cep.length > 8) {
		// Fazendo a requisição à API de busca de CEP
		fetch('https://viacep.com.br/ws/' + cep.replace('-', '') + '/json/')
			//then recebe a resposta da requisição e a passa como parametro para a função
			.then((response) => {
				return response.json();
			})
			//função preenche os campos do formulario com os dados da API
			.then((data) => {
				data.erro == true
					? swal
							.fire({
								title: 'CEP inválido',
								icon: 'error',
								text: 'Digite um CEP válido',
								showConfirmButton: false,
								timer: 2000,
							})
							.then(function () {
								document.getElementById('rua').value = '';
								document.getElementById('numero').value = '';
								document.getElementById('cidade').value = '';
								document.getElementById('estado').value = '';
								document.getElementById('cep').value = '';
							})
					: preencherDados(data);
			});
		//catch é uma função para quando há um erro de requisição, ele recebe o erro como parametro
	} else {
		swal
			.fire({
				title: 'CEP inválido',
				icon: 'error',
				text: 'Digite um CEP válido',
				showConfirmButton: false,
				timer: 2000,
			})
			.then(function () {
				document.getElementById('rua').value = '';
				document.getElementById('numero').value = '';
				document.getElementById('cidade').value = '';
				document.getElementById('estado').value = '';
				document.getElementById('cep').value = '';
			});
	}
}
function formatarCEP(input) {
	console.log(input);
	var cep = input.value.replace(/^[0-9]/g, '');

	if (cep.length === 8) {
		cep = cep.substring(0, 5) + cep.substring(5, 8);
		input.value = cep;
	}
}

function preencherDados(data) {
	// Preenchendo os campos com os dados retornados pela API
	document.getElementById('rua').value = data.logradouro;
	document.getElementById('cidade').value = data.localidade;
	document.getElementById('estado').value = data.uf;
}
