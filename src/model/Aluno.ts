import { DataBaseModel } from "./DataBaseModel";

// Recupera conexão com o banco de dados
const database = new DataBaseModel().pool;

/**
 * Classe que representa um aluno no sistema
 */
export class Aluno {
    private idAluno: number = 0; // Identificador único do aluno
    private ra: string = ''; // Registro acadêmico do aluno
    private nome: string; // Nome do aluno
    private sobrenome: string; // Sobrenome do aluno
    private dataNascimento: Date; // Data de nascimento do aluno
    private endereco: string; // Endereço do aluno
    private email: string; //E-mail do aluno
    private celular: string; // Celular do aluno
    private statusAluno: boolean = true; // Controla o status do aluno no sistema

    /**
     * Construtor da classe Aluno
     * 
     * @param nome Nome do Aluno
     * @param Sobrenome Sobrenome do Aluno
     * @param dataNascimento Data de nascimento do Aluno
     * @param endereco Endereço do Aluno
     * @param email Email do Aluno
     * @param celular Celular do Aluno
     */
    public constructor (_nome:string, _sobrenome:string, _dataNascimento: Date, _endereco:string, _email:string, _celular:string){
        this.nome           = _nome;
        this.sobrenome      = _sobrenome;
        this.dataNascimento = _dataNascimento;
        this.endereco       = _endereco;
        this.email          = _email;
        this.celular        = _celular;
    }

    //métodos GETTERS and SETTERS
    /**
     * Retorna o id do aluno
     * @returns id: id aluno
     */
    public getIdAluno(): number{
        return this.idAluno;
    }

    /**
     * Atribui o parâmetro ao atributo idAluno
     * 
     * @param _idAluno : idAluno
     */
    public setIdAluno(_idAluno: number): void{
        this.idAluno = _idAluno;
    }

    /*
    /**
     * Retorna o ra do aluno
     * @returns ra: ra aluno
     */
    public getRA(): string {
        return this.ra;
    }

    /**
     * Atribui o parâmetro ao atributo ra
     * 
     * @param _ra : ra do aluno
     */
    public setRA(_ra: string): void{
        this.ra = _ra;
    }
    

    /**
     * Retorna o nome do aluno
     * @returns nome: nome aluno
     */
    public getNome() {  
        return this.nome;
    }

    /**
     * Atribui o parâmetro ao atributo nome
     * 
     * @param _nome : nome do aluno
     */
    public setNome(_nome: string){  
        this.nome = _nome;
    }

    /**
     * Retorna o sobrenome do aluno
     * @returns sobrenome: sobrenome aluno
     */
    public getSobrenome() {  
        return this.sobrenome;
    }

    /**
     * Atribui o parâmetro ao atributo sobrenome
     * 
     * @param _sobrenome : sobrenome do aluno
     */
    public setSobrenome(_sobrenome: string){  
        this.sobrenome = _sobrenome;
    }

    /**
     * Retorna a dataNascimento do aluno
     * @returns datanascimento: dataNascimento aluno
     */
    public getDataNascimento() {
        return this.dataNascimento;
    }

    /**
     * Atribui o parâmetro ao atributo dataNascimento
     * 
     * @param _dataNascimento : dataNascimento do aluno
     */
    public setDataNascimento(_dataNascimento: Date) {
        this.dataNascimento = _dataNascimento;
    }

     /**
     * Retorna o endereço do aluno
     * @returns endereco: endereco aluno
     */
    public getEndereco() {
        return this.endereco;
    }
    
    /**
     * Atribui o parâmetro ao atributo endereco
     * 
     * @param _endereco : endereco do aluno
     */
    public setEndereco(_endereco: string) {
        this.endereco = _endereco;
    }

    /**
     * Retorna o email do aluno
     * @returns email: email aluno
     */
    public getEmail() {
        return this.email;
    }

    /**
     * Retorna o celular do aluno
     * @returns celular: celular aluno
     */
    public getCelular() {
        return this.celular;
    }

    /**
     * Atribui o parâmetro ao atributo celular
     * 
     * @param _celular : celular do aluno
     */
    public setCelular(_celular: string) {
        this.celular = _celular;
    }

    /**
     * Retorna o status do aluno no sistema
     * 
     * @return Status do aluno no sistema
     */
    public getStatusAluno(): boolean {
        return this.statusAluno;
    }

    /**
     * Atribui um valor ao status do aluno
     * 
     * @param _statusAluno : Valor a ser atribuido ao status do aluno
     */
    public setStatusAluno(_statusAluno: boolean) {
        this.statusAluno = _statusAluno;
    }

    // MÉTODO PARA ACESSAR O BANCO DE DADOS
    // CRUD Create - READ - Update - Delete

    /**
     * Retorna uma lista com todos os alunos cadastrados no banco de dados
     * 
     * @returns Lista com todos os alunos cadastrados no banco de dados
     */
    static async listarAlunos(): Promise<Array<Aluno> | null> {
        // Criando lista vazia para armazenar os alunos
        let listaDeAlunos: Array<Aluno> = [];

        try {
            // Query para consulta no banco de dados
            const querySelectAluno = `SELECT * FROM Aluno WHERE status_aluno = TRUE;`;

            // executa a query no banco de dados
            const respostaBD = await database.query(querySelectAluno);    

            // percorre cada resultado retornado pelo banco de dados
            // aluno é o apelido que demos para cada linha retornada do banco de dados
            respostaBD.rows.forEach((aluno: any) => {
                
                // criando objeto aluno
                let novoAluno = new Aluno(
                    aluno.nome,
                    aluno.sobrenome,
                    aluno.data_nascimento,
                    aluno.endereco,
                    aluno.email,
                    aluno.celular
                );
                // adicionando o ID ao objeto
                novoAluno.setIdAluno(aluno.id_aluno);
                novoAluno.setRA(aluno.ra);
                novoAluno.setStatusAluno(aluno.status_aluno);

                // adicionando a pessoa na lista
                listaDeAlunos.push(novoAluno);
            });

            // retornado a lista de pessoas para quem chamou a função
            return listaDeAlunos;
        } catch (error) {
            console.log(`Erro ao acessar o modelo: ${error}`);
            return null;
        }
    }

    /**
     * Cadastra um novo aluno no banco de dados
     * @param aluno Objeto Aluno contendo as informações a serem cadastradas
     * @returns Boolean indicando se o cadastro foi bem-sucedido
     */
    static async cadastrarAluno(aluno: Aluno): Promise<Boolean> {      
        try {
            // Cria a consulta (query) para inserir o registro de um aluno no banco de dados, retorna o ID do aluno que foi criado no final
            const queryInsertAluno = `
                INSERT INTO Aluno (nome, sobrenome, data_nascimento, endereco, email, celular)
                VALUES (
                    '${aluno.getNome().toUpperCase()}',
                    '${aluno.getSobrenome().toUpperCase()}',
                    '${aluno.getDataNascimento()}',
                    '${aluno.getEndereco().toUpperCase()}',
                    '${aluno.getEmail().toLowerCase()}',
                    '${aluno.getCelular()}'
                )
                RETURNING id_aluno;`;

            // Executa a query no banco de dados e armazena o resultado
            const result = await database.query(queryInsertAluno);

            // verifica se a quantidade de linhas que foram alteradas é maior que 0
            if (result.rows.length > 0) {
                // Exibe a mensagem de sucesso
                console.log(`Aluno cadastrado com sucesso. ID: ${result.rows[0].id_aluno}`);
                // retorna verdadeiro
                return true;
            }

            // caso a consulta não tenha tido sucesso, retorna falso
            return false;
        // captura erro
        } catch (error) {
            // Exibe mensagem com detalhes do erro no console
            console.error(`Erro ao cadastrar aluno: ${error}`);
            // retorna falso
            return false;
        }
    }

    /**
     * Remove um aluno do banco de dados
     * @param idAluno ID do aluno a ser removido
     * @returns Boolean indicando se a remoção foi bem-sucedida
    */
    static async removerAluno(id_aluno: number): Promise<Boolean> {
        // variável para controle de resultado da consulta (query)
        let queryResult = false;
    
        try {
            // Cria a consulta (query) para remover o aluno
            const queryDeleteEmprestimoAluno = `UPDATE emprestimo 
                                                    SET status_emprestimo_registro = FALSE
                                                    WHERE id_aluno=${id_aluno};`;

            // remove os emprestimos associado ao aluno
            await database.query(queryDeleteEmprestimoAluno);

            // Construção da query SQL para deletar o Aluno.
            const queryDeleteAluno = `UPDATE aluno 
                                        SET status_aluno = FALSE
                                        WHERE id_aluno=${id_aluno};`;
    
            // Executa a query de exclusão e verifica se a operação foi bem-sucedida.
            await database.query(queryDeleteAluno)
            .then((result) => {
                if (result.rowCount != 0) {
                    queryResult = true; // Se a operação foi bem-sucedida, define queryResult como true.
                }
            });
    
            // retorna o resultado da query
            return queryResult;

        // captura qualquer erro que aconteça
        } catch (error) {
            // Em caso de erro na consulta, exibe o erro no console e retorna false.
            console.log(`Erro na consulta: ${error}`);
            // retorna false
            return queryResult;
        }
    }


     /**
     * Atualiza os dados de um aluno no banco de dados.
     * @param aluno Objeto do tipo Aluno com os novos dados
     * @returns true caso sucesso, false caso erro
     */
    static async atualizarCadastroAluno(aluno: Aluno): Promise<Boolean> {
        let queryResult = false; // Variável para armazenar o resultado da operação.
        try {
            // Construção da query SQL para atualizar os dados do aluno no banco de dados.
            const queryAtualizarAluno = `UPDATE Aluno SET 
                                            nome = '${aluno.getNome().toUpperCase()}', 
                                            sobrenome = '${aluno.getSobrenome().toUpperCase()}',
                                            data_nascimento = '${aluno.getDataNascimento()}', 
                                            endereco = '${aluno.getEndereco().toUpperCase()}',
                                            celular = '${aluno.getCelular()}', 
                                            email = '${aluno.getEmail().toLowerCase()}'                                            
                                        WHERE id_aluno = ${aluno.idAluno}`;

            // Executa a query de atualização e verifica se a operação foi bem-sucedida.
            await database.query(queryAtualizarAluno)
            .then((result) => {
                if (result.rowCount != 0) {
                    queryResult = true; // Se a operação foi bem-sucedida, define queryResult como true.
                }
            });

            // Retorna o resultado da operação para quem chamou a função.
            return queryResult;
        } catch (error) {
            // Em caso de erro na consulta, exibe o erro no console e retorna false.
            console.log(`Erro na consulta: ${error}`);
            return queryResult;
        }
    }
}