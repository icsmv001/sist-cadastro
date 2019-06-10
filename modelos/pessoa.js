var App = require('../config/app')

var Pessoa = function(){
	this.nome = "";
	this.sobrenome = "";
	this.cpf = "";
	this.telefone = "";
	this.endereco = "";

	this.salvar = function(callback, cpfAlteracao){
	// codigo para gravar no banco de dodos mysql
    var query= "";

    if (cpfAlteracao == undefined) {
    	query = "insert into prjprogramador.pessoas3  (nome,sobrenome,cpf,telefone,endereco) values ('"+this.nome.toUpperCase()+"','"+this.sobrenome.toUpperCase()+"','"+this.cpf.toUpperCase()+"','"+this.telefone.toUpperCase()+"','"+this.endereco.toUpperCase()+"') ";
    } 
    else 
    {
      	query = "update  prjprogramador.pessoas3  set nome = '"+this.nome.toUpperCase()+"', sobrenome = '"+this.sobrenome.toUpperCase()+"',cpf       = '"+this.cpf.toUpperCase()+"',telefone  = '"+this.telefone.toUpperCase()+"',	endereco  = '"+this.endereco.toUpperCase()+"' WHERE cpf  LIKE '"+cpfAlteracao.toUpperCase()+"' ";
    }

	App.db.cnn.exec(query, function(dadosRetornadosDaTabela,erro ) {
	  	if(erro) {
	  		console.log ("Erro na execução da query (" + query + ")");
	  		callback.call();
	  	}
	    else{		  		
		  	callback.call();
	    }

	  });

	}

	this.excluir = function(callback){
    // codigo para excluir do banco de dados mysql
    var query = "delete  from prjprogramador.pessoas3 WHERE cpf  = '"+this.cpf.toUpperCase()+"' ";
                                         
    console.log(query);

    App.db.cnn.exec(query, function(dadosRetornadosDaTabela,erro ) {
	  	if(erro) {
	  		console.log ("Erro na execução da query (" + query + ")");
	  		callback.call();
	  	}
	    else{		  		
		  	callback.call();
	    }

	  });

   }
}

Pessoa.buscar = function(cpf, callback){
	var query = "select * from prjprogramador.pessoas3  WHERE cpf =  '" + cpf.toUpperCase() + "' "; 

	App.db.cnn.exec(query, function(dadosRetornadosDaTabela,erro ) {
	  	if(erro) {
	  		console.log ("Erro na execução da query (" + query + ")");
	  		callback.call(null, null);
	  	}
	    else{	
	    	if (dadosRetornadosDaTabela.length >0) {
	    	   callback.call(null, dadosRetornadosDaTabela[0]);
			}
			else {
				callback.call(null, null);		
			}

		}

	  });

	

}



Pessoa.buscarPorNome = function(nome, callback){
	var query = "select * from prjprogramador.pessoas3  WHERE NOME LIKE '%" + nome.toUpperCase() + "%' "; 

	App.db.cnn.exec(query, function(dadosRetornadosDaTabela,erro ) {
	  	if(erro) {
	  		console.log ("Erro na execução na query (" + query + ")");
	  		callback.call(null, []);
	  	}
	    else{		  		
		  	callback.call(null, dadosRetornadosDaTabela);
	    }

	  });


}


Pessoa.todos = function(callback){
// codigo de busca geral\todos do banco de dados mysql

	var query = "select * from prjprogramador.pessoas3 ";
	// var query = "select p.* from prjprogramador.pessoas3 p where nome like '%'" + nome   + "%';";
	
	App.db.cnn.exec(query, function(dadosRetornadosDaTabela,erro ) {
	  	if(erro) {
	  		console.log ("Erro na execução na query (" + query + ")");
	  		callback.call(null, []);
	  	}
	    else{		  		
		  	callback.call(null, dadosRetornadosDaTabela);
	    }

	  });
  

}

module.exports = Pessoa;