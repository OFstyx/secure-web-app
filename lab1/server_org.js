const http = require('http');
const fs = require('fs');
const url = require('url');
const pathutil = require("path");

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((rq, rs) => {
	
	let query = url.parse(rq.url, true);
	let data = query.query;
	let filename = query.pathname;
	let path = filename;
	
	//Не даём никому никакие файлы кроме тех которые хотим отдать: из своей папки и тлко с расширением html
	//см. https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/05-Authorization_Testing/01-Testing_Directory_Traversal_File_Include
	//Поэтому проверим путь, который нам прислали

	//1. Нормализуем путь, удалим оттуда все ненужные нам точки https://nodejs.org/api/path.html#pathnormalizepath 
	path = pathutil.normalize(path);
	//2. Преобразуем относительный путь из адреса в путь относительно корня сайта https://nodejs.org/api/path.html#pathbasenamepath-ext 
	path = pathutil.basename(path);
	//3. Проверим расширение https://nodejs.org/api/path.html#pathextnamepath
	if(pathutil.extname(path) !== '.html'){
		rs.writeHead(400);
			rs.end('we host only html files');
			return; //Выходим с ошибкой
	}


	
	
	if(filename === "/signin.html"){//Это страница проверки пароля
		if (data.name === '' || data.password === '') {
			rs.writeHead(400);
			rs.end('login or password is empty');
			return;
		}

		let login = data.name;//Имя пользователя со страницы логина
		//прочитаем файл с паролями с диска и найдём в нём нашего пользователя
		try {
			users = fs.readFileSync('./users.txt', 'utf8');
			console.log(users);
		}
		catch (error) {
			rs.writeHead(500);
			rs.end('Internal server error');
			console.log('File doesn\'t exist');
			return;
		}
		let account_lines = users.split(/\n/); //Строки файла, в каждой строке аккаунт - имя и пароль соединённые через; Проверьте концы строк: Open the command pallette (CTRL+SHIFT+P) and type "Change All End Of Line Sequence".

		let is_user_exists = false;
		let password_to_check = undefined;

		for (let account_line of account_lines){
			let account = account_line.split(';');
			let account_name = account[0];
			let account_pass = account[1];
			if(login === account_name){
				is_user_exists = true;
				password_to_check = account_pass;
				break; //Нашли пользователя, сохраним его пароль для последующей проверки
			}
		}

		if(is_user_exists === false) //Не нашли пользователя
		{
			rs.writeHead(403);
			rs.end('user does not exists');
			return; //Выходим с ошибкой
		}

		if(data.pass === password_to_check)//Нашли пользователя, проверим пароль
		{
			rs.writeHead(200);
			rs.end('SUCCESS'); //пароль верный
			return;
		} else { //пароль не совпал
			rs.writeHead(403);
			rs.end('wrong password');
			return; //Выходим с ошибкой
		}
		
	}
	
	//Это не проверка пароля, а просто ктото попрсил страницу, отдадим её
	fs.readFile(path, (err, data) => {
    if (err) {
		console.error(err);
		rs.writeHead(404);
		rs.end();
		return;
    }
    
	rs.statusCode = 200;
	rs.setHeader('Content-Type', 'text/html');
	rs.end(data);
	});
	
});

server.listen(port, hostname, ()=>{
	console.log(`server running at http://${hostname}:${port}`);
})
