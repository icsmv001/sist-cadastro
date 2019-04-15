// arquivo de configuracao
mysql = require('mysql');
connectionString = 'mysql://cms:123@localhost/prjprogramador';
//  -- teste ok --> connectionString = 'mysql://livro:livro123@localhost/livro';

db = {}
db.cnn = {};
db.cnn.exec = function(query, callback) {
var connection = mysql.createConnection(connectionString);
  connection.query(query, function(err, rows) {
  	if(err) throw err;
  	callback(rows, err);
    connection.end ();
  });
};


// craido hash para armazenar referencia a localização de banco de dados 
var App = {
///BANCO_ARQUIVO: "D:\\cursos\\PRJ_PROGRAMADOR\\backend\\dados\\bancoArquivo.js",
db: db
}

module.exports = App;

