async function connect() {
    if (global.connection && global.connection.state !== "disconnected") {
      return global.connection;
    }
  
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection({
      host: "54.91.193.137",
      user: "libertas",
      password: "123456",
      database: "libertas5per",
    });
    global.connection = connection;
    return connection;
  }
  
  exports.createTable = async (req, res) => {
    const con = await connect();
    const sql = `
      CREATE TABLE IF NOT EXISTS musica (
        idmusica INT AUTO_INCREMENT,
        titulo VARCHAR(100),
        ano INT,
        genero VARCHAR(50),
        artista VARCHAR(100),
        PRIMARY KEY(idmusica)
      );
    `;
    await con.query(sql);
    res.status(201).send({ message: "Tabela de músicas criada com sucesso!", success: true });
  };
  
  exports.post = async (req, res) => {
    const con = await connect();
    const sql = "INSERT INTO musica (titulo, ano, genero, artista) VALUES (?, ?, ?, ?)";
    const values = [
      req.body.titulo,
      req.body.ano,
      req.body.genero,
      req.body.artista
    ];
    await con.query(sql, values);
    res.status(201).send({ message: "Música inserida com sucesso!", success: true });
  };
  
  exports.put = async (req, res) => {
    let id = req.params.id;
    const con = await connect();
    const sql = "UPDATE musica SET titulo = ?, ano = ?, genero = ?, artista = ? WHERE idmusica = ?";
    const values = [
      req.body.titulo,
      req.body.ano,
      req.body.genero,
      req.body.artista,
      id
    ];
    await con.query(sql, values);
    res.status(200).send({ message: "Música atualizada com sucesso!", success: true });
  };
  
  exports.delete = async (req, res) => {
    let id = req.params.id;
    const con = await connect();
    const sql = "DELETE FROM musica WHERE idmusica = ?";
    await con.query(sql, [id]);
    res.status(200).send({ message: "Música excluída com sucesso!", success: true });
  };
  
  exports.get = async (req, res) => {
    const con = await connect();
    const titulo = req.query.titulo;
  
    let sql = "SELECT * FROM musica";
    let parametros = [];
  
    if (titulo) {
      sql += " WHERE titulo LIKE ?";
      parametros.push(`%${titulo}%`);
    }
  
    const [rows] = await con.query(sql, parametros);
    res.status(200).send(rows);
  };
  
  exports.getById = async (req, res) => {
    const con = await connect();
    const id = req.params.id;
    const sql = "SELECT * FROM musica WHERE idmusica = ?";
    const [rows] = await con.query(sql, [id]);
  
    if (rows.length === 0) {
      return res.status(404).send({ message: "Não encontrada", success: false });
    }
  
    res.status(200).send(rows[0]);
  };