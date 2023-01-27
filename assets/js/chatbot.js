$(document).ready(function () {
  $('.openChat').click(function () {
    $('.gridChatBot').toggle();
    $(this).hide(300);
  });

  $('.btnCloseChat').click(function () {
    $('.gridChatBot').hide();
    $('.openChat').show(300);
  });
});



// let hourNow = new Date().toLocaleTimeString().split(':');
// hourNow = [hourNow[0], hourNow[1]].join(':');
// let resquest = $('#inputMsg')

// const BotResponse = () => {
// 	const responses = {
// 		IPTU: 'O valor do IPTU é de R$ 100,00',
// 		ISS: 'O valor do ISS é de R$ 50,00',
// 	};
// 	let hourNow = new Date().toLocaleTimeString().split(':');
// 	hourNow = [hourNow[0], hourNow[1]].join(':');

// 	$('#messagesList').append(`<div class="bot d-flex mb-2">
// 										<img
// 											src="./assets/img//chatbot/logoBot.jpg"
// 											class="rounded"
// 											style="width: 32px; height: 32px"
// 											alt="bot" />
// 										<div class="text-bg-secondary p-2 rounded-3 d-flex flex-column">
// 											${responses.IPTU}
// 											<span class="time text-end">${hourNow}</span>
// 										</div>
// 									</div>`);
// };

const UserRequest = () => {
		$('#messagesList').append(`<div class="user d-flex mb-2 flex-row-reverse">
									<img
										src="./assets/img//chatbot/userIcon.png"
										class="rounded"
										style="width: 32px; height: 32px"
										alt="bot" />
									<div class="text-bg-success p-2 rounded-3 d-flex flex-column">
										${resquest.val()}
										<span class="time text-end">${hourNow}</span>
									</div>
								</div>`)
  resquest.val('');
};

$('#sendBtn').on('click', function () {
  switch (resquest.val() != '') {
    case true:
		$(this).css('animation', 'send 1.5s 0.2s both');
		setTimeout(() => {
			$(this).removeAttr('style');
    }, 1500);
  UserRequest();
      break;
    case false: {
      resquest.attr('placeholder', 'Digite uma mensagem!')
      setTimeout(() =>  resquest.attr('placeholder', 'Qual sua demanda hoje?'), 1000) 
      break
    }
  }
	});

