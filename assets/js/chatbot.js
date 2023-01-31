const userRequestInput = $('#inputMsg');
localStorage.setItem(
	'history',
	'Você é uma inteligencia artifical desenvolvida pela startup FrontEnders, que está sediada no Brasil. Seu papel é ajudar o usuário de que interagem com você com informacoes sobre servicos financeiros da empresa para qual voce trabalha. Use prefixo "IA:" antes de cada respostas. \n',
);
const API = async (UserInput) => {
	let Output = '';
	await fetch('https://api.openai.com/v1/engines/text-davinci-001/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer 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',
		},
		body: JSON.stringify({
			prompt: UserInput,
			// temperature: 0,
			// max_tokens: 60,
			// top_p: 1,
			// frequency_penalty: 0.5,
			// presence_penalty: 0.1,

			temperature: 0,
			max_tokens: 150,
			top_p: 1,
			frequency_penalty: 0.5,
			presence_penalty: 0.9,
			stop: [' H:', ' IA:'],
		}),
	})
		.then((response) => response.json())
		.then((data) => (Output = data.choices[0].text))
		.catch(
			(err) =>
				(Output =
					'⚠️ Com o objetivo de aprimorar a plataforma e melhorar sua experiência, estamos realizando uma manutenção programada. O nosso sistema ficará indisponível até a conclusão da manutenção. Pedimos desculpas pelo transtorno e agradecemos a compreensão.'),
		);
	return Output;
};

const getTimestamp = () => {
	let hourNow = new Date().toLocaleTimeString().split(':');
	return (hourNow = [hourNow[0], hourNow[1]].join(':'));
};

let autoScroll = () => $('.messagesList').animate({ scrollTop: $(document).height() }, 500);
let userRequestsList = [];

$(document).ready(function () {
	// Abre o chatbot ao clicar no botão de abrir
	$('.openChat').click(function () {
		$('.gridChatBot').toggle();
		$(this).hide(300);
	});

	$('#btnLiveDemo').click(function () {
		$('.gridChatBot').toggle();
		$('.openChat').hide(300);
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
			setTimeout(() => {
				$(this).removeAttr('disabled');
				$(this).focus();
				$(this).on('focus', () => {
					autoScroll();
				});
			}, 1500);
		}
	});

	$('#sendBtn').on('click', function () {
		UserRequest();
	});
});

const BotResponse = () => {
	let ResID = userRequestsList.length;
	let prefixHuman = '\nH: ';
	let history = localStorage.getItem('history');
	let userReqInput = `${userRequestInput.val()}`;
	(userReqInput.split(' ').length < 2 && userReqInput == 'Oi') ||
	userReqInput == 'oi' ||
	userReqInput == 'Ola' ||
	userReqInput == 'ola' ||
	userReqInput == 'Olá' ||
	userReqInput == 'olá' ||
	userReqInput == 'obrigado' ||
	userReqInput == 'Obrigado' ||
	userReqInput == 'obrigada' ||
	userReqInput == 'Obrigada'
		? (userReqInput = 'Retorne com uma saudação')
		: userReqInput;

	$('#messagesList').append(`<div class="bot d-flex mb-2">
										<img
											src="./assets/img//chatbot/logoBot.jpg"
											class="rounded"
											style="width: 32px; height: 32px"
											alt="bot" />
										<div class="text-bg-secondary p-2 rounded-3 d-flex flex-column">
										<img id=loading src="./assets/img/chatbot/loading.gif" alt="" srcset="" />
											<span id='botRes${ResID}'></span>
											<span class="time text-end">${getTimestamp()}</span>
										</div>
									</div>`);

	localStorage.setItem('history', (history += prefixHuman + userReqInput));

	API(history).then((data) => {
		localStorage.setItem('history', (history += data + '\n'));
		// history += data;
		$('#loading').remove();
		data.split('').forEach((letter, index) => {
			$(`#messagesList` || `#botRes${ResID}`).on('click', () => clearTimeout(writeTimer));

			let writeTimer = setTimeout(() => {
				$(`#botRes${ResID}`).append(letter);
			}, 50 * index);
		});
	});

	setTimeout(() => {
		autoScroll();
	}, 2000);
};

const UserRequest = () => {
	let ReqID = userRequestsList.length;
	userRequestsList.push(userRequestInput.val());

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
					autoScroll();
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
