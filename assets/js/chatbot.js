const userRequestInput = $('#inputMsg');

// variavel que armazena as respostas do bot
const botResponses = [
	'Desculpe, não compreendi sua pergunta! poderia reformular?',
	'Perfeito! Encontrei algumas informações para você sobre o IPTU:',
	'Perfeito! Encontrei algumas informações para você sobre o ISS:',
];

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
	let userRequest = userRequestInput.val().toLocaleUpperCase().trim().split(' '); // variável que armazena a pergunta do usuário

	// Filtra a pergunta do usuário para que seja possível encontrar a resposta do bot
	let filterUserRequest = userRequest.filter((request) => {
		switch (request) {
			case 'IPTU':
				return request == 'IPTU';
			case 'ISS':
				return request == 'ISS';
			default:
				return request == 'Desculpe';
		}
	});

	// Encontra a resposta do bot
	botResponseOutput = botResponses.find((response) => {
		return response.includes(filterUserRequest);
	});
	return botResponseOutput; // retorna a resposta do bot
};

const BotResponse = () => {
	$('#messagesList').append(`<div class="bot d-flex mb-2">
										<img
											src="./assets/img//chatbot/logoBot.jpg"
											class="rounded"
											style="width: 32px; height: 32px"
											alt="bot" />
										<div class="text-bg-secondary p-2 rounded-3 d-flex flex-column">
											${botResponseOutput()}
											<span class="time text-end">${getTimestamp()}</span>
										</div>
									</div>`);
	autoScroll();
};

const UserRequest = () => {
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
										${userRequestInput.val()}
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
