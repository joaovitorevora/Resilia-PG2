const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i
$(document).ready(function () {
	let signedUser = localStorage.getItem('loggedUser');
	if (localStorage.getItem('loggedUser') !== null) {
		let user = getUser(signedUser);

		$('#btnLoginHeader').hide();
		$('#navLinks')
			.append(`<div id="loggedArea" class="text-light d-flex align-items-center bg-dark p-3 rounded-3">
							<div>
								<p class=" fw-bold">${user?.name}</p>
								<span class="text-lowercase">${user?.email}</span>
							</div>
							<a id=btnLogoff href="javascript:void(0)" class="logoff ms-3  badge text-dark bg-warning"
								><i class="bi bi-box-arrow-right"></i
							></a>
						</div>`);
	} else {
		localStorage.removeItem('loggedUser');
		$('#btnLoginHeader').show();
		$('#loggedArea').remove();
	}

	$('#btnLogoff').on('click', () => {
		localStorage.removeItem('loggedUser');

		window.location.href = 'login.html';
	});
});

function verificaForcaSenha() {
	const numeros = /([0-9])/;
	const alfabetoa = /([a-z])/;
	const alfabetoA = /([A-Z])/;
	const chEspeciais = /([~,!,@,#,$,%,^,&,*,-,_,+,=,?,>,<])/;

	if ($('#password').val().length < 6) {
		$('#password-status').html(
			"<span style='color:red'>Fraco, insira no mínimo 6 caracteres</span>",
		);
	} else {
		if (
			$('#password').val().match(numeros) &&
			$('#password').val().match(alfabetoa) &&
			$('#password').val().match(alfabetoA) &&
			$('#password').val().match(chEspeciais)
		) {
			$('#password-status').html("<span style='color:green'><b>Forte</b></span>");
		} else {
			$('#password-status').html("<span style='color:orange'>Médio</span>");
		}
	}
}
function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
  }
//===== Intruções =====
const getUser = (email) => User.getUser(email); // Retorna o usuário caso exista
const listUsers = () => User?.listUsers(); // Lista todos os usuários cadastrados
const registerUser = (name, email, password, rg, nascimento, cep, rua, numero, cidade, estado) =>
	User.register(name, email, password, rg, nascimento, cep, rua, numero, cidade, estado); // Cadastra um novo usuário

// Classe para manipular usuários
class User {
	constructor(name, email, password, rg, nascimento, cep, rua, numero, cidade, estado) {
		this.name = name;
		this.email = email.toLowerCase();
		this.password = btoa(password);
		this.rg = rg;
		this.nascimento = nascimento;
		this.cep = cep;
		this.rua = rua;
		this.numero = numero;
		this.cidade = cidade;
		this.estado = estado;
	}

	// Função para cadastrar usuário no LocalStorage
	static register(name, email, password, rg, nascimento, cep, rua, numero, cidade, estado) {
		const user = new User(name, email, password, rg, nascimento, cep, rua, numero, cidade, estado);

		let users = JSON.parse(localStorage.getItem('users')) || [];
		users.push(user);
		localStorage.setItem('users', JSON.stringify(users));
		return user;
	}

	// Função para buscar usuário cadastrado no LocalStorage
	static getUser(email) {
		let users = JSON.parse(localStorage.getItem('users'));
		let user = null;

		users?.forEach((item) => {
			item?.email == email ? (user = item) : null;
		});
		return user;
	}

	// Função para listar todos os usuários cadastrados no LocalStorage
	static listUsers() {
		const users = JSON.parse(localStorage.getItem('users'));

		users?.forEach((user) => {
			console.log(
				`Nome: ${user.name} - Email: ${user.email} - RG: ${user.rg} - Nascimento: ${user.nascimento} - CEP: ${user.cep} - Rua: ${user.rua} - Numero: ${user.numero} - Cidade: ${user.cidade} - Estado: ${user.estado}`,
			);
		});
	}
}

// Função para validar o campo de recuperacao de senha com SweetAlert2
$('#forgoutPassword').click(() => {
	configs = {
		title: 'Recuperaçao de senha',
		input: 'email',
		inputAttributes: {
			autocapitalize: 'off',
		},
		showCancelButton: true,
		confirmButtonText: 'Recuperar',
		cancelButtonText: 'Cancelar',
		confirmButtonColor: '#198754',
		cancelButtonColor: '#212529',
		showLoaderOnConfirm: true,
		inputPlaceholder: 'Informe seu endereco de e-mail',
		validationMessage: 'Informe um e-mail válido!',
		allowEnterKey: true,
	};
	Swal.fire({
		...configs,
		preConfirm: (email) => {
			!!User.getUser(email)
				? swal.fire({
						title: 'Link enviado!',
						icon: 'success',
						text: 'Verifique sua caixa de entrada!',
						showConfirmButton: false,
						timer: 1500,
				  })
				: swal.fire({
						title: 'E-mail não cadastrado!',
						icon: 'error',
						text: 'Verifique seu e-mail e tente novamente!',
						showConfirmButton: false,
						timer: 2000,
				  });
		},
	});
});

function verificaForcaSenha1() {
	// INCLUIR SITUAÇÃO QUE OS CAMPOS ESTÃO VAZIOS
	if ($('#password').val() == $('#password2').val()) {
		$('#password-status').html("<span style='color:green'>Senha Ok!</span>");
	} else {
		$('#password-status').html("<span style='color:red'>Senhas precisam ser iguais</span>");
	}
}

$('#btnRegister').click(() => {
	const name = $('#nome').val();
	const email = $('#email').val();
	const rg = $('#rg').val();
	const nascimento = $('#dtnasc').val();
	const password = $('#password').val();
	const cep = $('#cep').val();
	const rua = $('#rua').val();
	const numero = $('#numero').val();
	const cidade = $('#cidade').val();
	const estado = $('#estado').val();

	if (
		name == '' ||
		email == '' ||
		rg == '' ||
		nascimento == '' ||
		password == '' ||
		cep == '' ||
		rua == '' ||
		numero == '' ||
		cidade == '' ||
		estado == ''
	) {
		swal.fire({
			title: 'Atenção!',
			icon: 'warning',
			text: 'Preencha todos os campos!',
			showConfirmButton: false,
			timer: 1500,
		});
	} else if($('#password').val() != $('#password2').val()) {
		swal.fire({
			title: 'Atenção!',
			icon: 'warning',
			text: 'Confirme se as senhas estão iguais!',
			showConfirmButton: false,
			timer: 1500,
		});
		
	}
	else {
		if (User.getUser(email) == null) {
			User.register(name, email, password, rg, nascimento, cep, rua, numero, cidade, estado);
			swal.fire({
				title: 'Cadastro realizado com sucesso!',
				icon: 'success',
				text: 'Aguarde...',
				showConfirmButton: false,
				timer: 1500,
			});

			setTimeout(() => {
				window.location.href = 'index.html';
			}, 1500);
		} else {
			swal.fire({
				title: 'Atenção!',
				icon: 'warning',
				text: 'E-mail já cadastrado!',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	}
});

$('#btnLogin').click((e) => {
	e.preventDefault();
	const email = $('#inputEmail').val();
	const password = $('#password').val();

	if (email == '' || password == '') {
		swal.fire({
			title: 'Atenção!',
			icon: 'warning',
			text: 'Preencha todos os campos!',
			showConfirmButton: false,
			timer: 1500,
		});
	} else {
		let user = User.getUser(email);
		if (user != null) {
			if (user.password == btoa(password)) {
				localStorage.setItem('loggedUser', user.email);
				$('#btnLoginHeader').hide();
				$('#navLinks')
					.append(`<div id="loggedArea" class="text-light d-flex align-items-center bg-dark p-3 rounded-3">
							<div>
								<p class=" fw-bold">${user.name}</p>
								<span class="text-lowercase">${user.email}</span>
							</div>
							<a href="" class="logoff ms-3  badge text-dark bg-warning"
								><i class="bi bi-box-arrow-right"></i
							></a>
						</div>`);
				swal.fire({
					title: 'Login realizado com sucesso!',
					icon: 'success',
					text: 'Aguarde...',
					showConfirmButton: false,
					timer: 1500,
				});
				setTimeout(() => {
					window.location.href = 'index.html';
				}, 1500);
			} else {
				swal.fire({
					title: 'Atenção!',
					icon: 'warning',
					text: 'Senha incorreta!',
					showConfirmButton: false,
					timer: 1500,
				});
			}
		} else {
			swal.fire({
				title: 'Atenção!',
				icon: 'warning',
				text: 'E-mail não cadastrado!',
				showConfirmButton: false,
				timer: 1500,
			});
		}
	}
});
// validando para nome ficar apenas como text
const input = document.getElementById("nome");
input.addEventListener("input", function () {
  const value = input.value;
  const regex = /^[a-zA-Z]+$/;
  if (!regex.test(value)) {
    input.value = value.slice(0, -1);
  }
});



