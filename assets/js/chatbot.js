const userRequestInput = $('#inputMsg');

const BotResp = {
	ERROR99: {
		ERROR99: 'Desculpe, não compreendi sua pergunta! poderia reformular?',
		ERROR98: 'Hmmm... não entendi, poderia reformular?',
		ERROR97: 'Desculpe, você poderia detalhar sua pergunta um pouco melhor?',
	},
	ajuda: 'Eu posso te ajudar com o IPTU ou o ISS',
	localidade:
		'Perfeito! Antes, preciso saber qual a localiadde da filial que você deseja consultar.',
	saudacao: () => {
		let hourNow = new Date().getHours();
		let saudacao = 'Olá, como posso te ajudar?';
		if (hourNow >= 0 && hourNow < 12) {
			saudacao = 'Bom dia, como posso te ajudar?';
		} else if (hourNow >= 12 && hourNow < 18) {
			saudacao = 'Boa tarde, como posso te ajudar?';
		} else if (hourNow >= 18 && hourNow < 24) {
			saudacao = 'Boa noite, como posso te ajudar?';
		}
		return saudacao;
	},
	iptu: {
		reformular: 'Oque voce deseja saber sobre o IPTU?',
		valor: 'O valor do seu IPTU no corrente ano é de R$ 100,00',
		vencimento: 'O vencimento do IPTU é no dia 10 de cada mês',
		pagamento: 'O pagamento do IPTU pode ser feito em dinheiro, cartão de crédito ou débito',
		parcelamento: 'O IPTU pode ser parcelado em até 3 vezes',
		multa: 'O IPTU tem multa de 2% ao mês de atraso',
		juros: 'O IPTU tem juros de 1% ao mês de atraso',
		site: 'O IPTU pode ser consultado no site da prefeitura de ',
		ajuda:
			'Eu posso buscar as seguintes informacoes relacionadas ao IPTU: valor, vencimento, pagamento, parcelamento, multa, juros, site.',
		setlink: function () {
			let newSite = this.site + 'https://www.prefeitura.com.br';
			return newSite;
		},
	},

	iss: {
		reformular: 'Oque voce deseja saber sobre o ISS?',
		valor: 'O valor do ISS é de R$ 100,00',
		vencimento: 'O vencimento do ISS é no dia 10 de cada mês',
		pagamento: 'O pagamento do ISS pode ser feito em dinheiro, cartão de crédito ou débito',
		parcelamento: 'O ISS pode ser parcelado em até 3 vezes',
		multa: 'O ISS tem multa de 2% ao mês de atraso',
		juros: 'O ISS tem juros de 1% ao mês de atraso',
		site: 'O ISS pode ser consultado no site da prefeitura ',
		ajuda: `Eu posso buscar as seguintes informacoes relacionadas ao ISS: valor, vencimento, pagamento, parcelamento, multa, juros, site.`,
		setlink: function () {
			let newSite = this.site + 'https://www.prefeitura.com.br';
			return newSite;
		},
	},
};

let userRequestsList = [];
const getTimestamp = () => {
	let hourNow = new Date().toLocaleTimeString().split(':');
	return (hourNow = [hourNow[0], hourNow[1]].join(':'));
};

let autoScroll = () => $('.messagesList').animate({ scrollTop: $(document).height() }, 500);

$(document).ready(function () {
	// Abre o chatbot ao clicar no botão de abrir
	$('.openChat').click(function () {
		$('.gridChatBot').toggle();
		$(this).hide(300);
	});

	// Fecha o chatbot ao clicar no botão de fechar
	$('.btnCloseChat').click(function () {
		$('.gridChatBot').hide();
		$('.openChat').show(300);
	});

	// Envia a mensagem do usuário ao pressionar a tecla enter
	$('#inputMsg').keypress(function (e) {
		if (e.which == 13) {
			e.preventDefault();
			UserRequest();
			$(this).prop('disabled', 'true');
			setTimeout(() => $(this).removeAttr('disabled'), 1500);
		}
	});
});

const botResponseOutput = () => {
	let botResponseOutput; // variável que armazena a resposta do bot
	let userRequest = userRequestInput
		.val()
		.toLowerCase()
		.trim()
		.replace(/[!?@#]/, '')
		.split(' '); // variável que armazena a pergunta do usuário
	console.log('userRequest: ', userRequest);
	let filterReq1 = userRequest.filter((request) => {
		return (
			request == 'iptu' ||
			request == 'iss' ||
			request == 'olá' ||
			request == 'oi' ||
			request == 'dia' ||
			request == 'tarde' ||
			request == 'noite'
		);
	});

	let filterReq2 = userRequest.filter((request) => {
		return (
			request == 'valor' ||
			request == 'vencimento' ||
			request == 'pagamento' ||
			request == 'parcelamento' ||
			request == 'juros' ||
			request == 'multa' ||
			request == 'site' ||
			request == 'ajuda'
		);
	});

	if (
		filterReq1 == 'dia' ||
		filterReq1 == 'tarde' ||
		filterReq1 == 'noite' ||
		filterReq1 == 'olá' ||
		filterReq1 == 'oi'
	) {
		botResponseOutput = BotResp.saudacao();
	} else if (filterReq1 == 'iptu' || filterReq1 == 'iss') {
		if (filterReq2 == 'site') {
			botResponseOutput = BotResp[filterReq1].setlink();
		} else {
			botResponseOutput = BotResp[filterReq1][filterReq2] ?? BotResp[filterReq1]['reformular'];
		}
	} else if (filterReq1 == 'ajuda') {
		botResponseOutput = BotResp[filterReq1];
	} else {
		let rdmERROR = Math.floor(Math.random() * (99 - 97 + 1) + 97);
		botResponseOutput = BotResp['ERROR99'][`ERROR${rdmERROR}`];
	}

	return botResponseOutput; // retorna a resposta do bot
};

const BotResponse = () => {
	let write = botResponseOutput().split('');
	let ResID = userRequestsList.length;

	$('#messagesList').append(`<div class="bot d-flex mb-2">
										<img
											src="./assets/img//chatbot/logoBot.jpg"
											class="rounded"
											style="width: 32px; height: 32px"
											alt="bot" />
										<div class="text-bg-secondary p-2 rounded-3 d-flex flex-column">
											<span id='botRes${ResID}'></span>
											<span class="time text-end">${getTimestamp()}</span>
										</div>
									</div>`);
	write.forEach((letter, index) => {
		setTimeout(() => {
			$(`#botRes${ResID}`).append(letter);
			autoScroll();
		}, 50 * index);
	});
};

const UserRequest = () => {
	userRequestsList.push(userRequestInput.val());
	let ReqID = userRequestsList.length;
	switch (userRequestInput.val() != '') {
		case true:
			$('#sendBtn').css('animation', 'send 1.5s 0.2s both');
			setTimeout(() => {
				$('#sendBtn').removeAttr('style');
				$('#messagesList').append(`<div class="user d-flex mb-2 flex-row-reverse">
									<img
										src="./assets/img//chatbot/userIcon.png"
										class="rounded"
										style="width: 32px; height: 32px"
										alt="bot" />
									<div class="text-bg-success p-2 rounded-3 d-flex flex-column">
										<span id='userReq${ReqID}'>${userRequestInput.val()}</span>
										<span class="time text-end">${getTimestamp()}</span>
									</div>
								</div>`);
				setTimeout(() => {
					BotResponse();
					userRequestInput.val('');
				}, 500);
			}, 1500);
			break;

		case false: {
			userRequestInput.attr('placeholder', 'Digite uma mensagem!');
			setTimeout(() => userRequestInput.attr('placeholder', 'Qual sua demanda hoje?'), 1000);
			break;
		}
	}
	autoScroll();
};

$('#sendBtn').on('click', function () {
	UserRequest();
});
