const userRequestInput = $('#inputMsg');
const API = async (UserInput) => {
	let Output = '';
	await fetch('https://api.openai.com/v1/engines/text-davinci-002/completions', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: 'Bearer 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',
		},
		body: JSON.stringify({
			prompt: UserInput,
			temperature: 1,
			max_tokens: 150,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0.6,
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

let autoScroll = () => $('.messagesList').animate({ scrollTop: 300 }, 500);
let userRequestsList = [];

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
			setTimeout(() => {
				$(this).removeAttr('disabled');
				$(this).focus();
			}, 1500);
		}
	});

	$('#sendBtn').on('click', function () {
		UserRequest();
	});
});

const BotResponse = () => {
	let ResID = userRequestsList.length;
	let userReqInput = userRequestInput.val();

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

	API(userReqInput).then((data) => {
		$('#loading').remove();
		data.split('').forEach((letter, index) => {
			$(`#messagesList` || `#botRes${ResID}`).on('click', () => clearTimeout(writeTimer));
			autoScroll();

			let writeTimer = setTimeout(() => {
				$(`#botRes${ResID}`).append(letter);
			}, 50 * index);
		});
	});
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
