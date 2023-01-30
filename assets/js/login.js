function verificaForcaSenha()
{
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

//===== Intruções =====
const getUser = (email) => User.getUser(email); // Retorna o usuário caso exista
const listUsers = () => User?.listUsers(); // Lista todos os usuários cadastrados
const register = (name, email, password) => User.register(name, email, password); // Cadastra um novo usuário

// Classe para manipular usuários
class User {
	constructor(name, email, password) {
		this.name = name;
		this.email = email.toLowerCase();
		this.password = btoa(password);
	}

	// Função para cadastrar usuário no LocalStorage
	static register(name, email, password) {
		const user = new User(name, email, password);

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
			console.log(`Nome: ${user.name} - Email: ${user.email}`);
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

function verificaForcaSenha1(){

// INCLUIR SITUAÇÃO QUE OS CAMPOS ESTÃO VAZIOS
  if ($("#password").val() == $("#password2").val()) {
	$('#password-status').html(
		"<span style='color:green'>Senha Ok!</span>",
	);
    
  }
  
  else {
	$('#password-status').html(
		"<span style='color:red'>Senhas precisam ser iguais</span>",
	);
  }


}