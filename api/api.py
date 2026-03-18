from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from .functions import *
import os
import psycopg2
import psycopg2.extras

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config["SESSION_PERMANENT"] = False


@app.route("/api/data")
def date():
    return {
        "date": comecou_processo(datetime.now())
    }


@app.route("/api/cadastro", methods=["POST"])
def cadastro():
    nome: str = request.form.get("nome")
    if verifica_texto(nome):
        return {
            "erro": ERRO_NOME
        }
    
    matricula: str = request.form.get("mat")
    if not matricula.isnumeric():
        return {
            "erro": ERRO_MATRICULA
        }
    
    email: str = request.form.get("email")
    if (
        not email.find("@") or verifica_texto(email)
    ):
        return {
            "erro": ERRO_EMAIL
        }

    tel: str = request.form.get("tel")
    if (
        len(tel) != 19 or verifica_texto(tel)
    ):
        return {
            "erro": ERRO_TEL
        }

    senha: str = request.form.get("senha")
    if (
        verifica_texto(senha) or len(senha) < 6
    ):
        return {
            "erro": ERRO_SENHA
        }

    banco = get_db_connection()

    db = banco.cursor()
    
    db.execute(
        "INSERT INTO users VALUES (%s, %s, %s, %s, %s, False, 0)",
        (matricula, nome, email, tel, create_hash(senha))
    )

    banco.commit()

    db.close()
    banco.close()

    return {
        "erro": 0
    }


@app.route("/api/login", methods=["POST"])
def login():
    matricula = request.form.get("matricula")
    if not matricula.isnumeric():
        return {
            "erro": ERRO_MATRICULA
        }
    
    banco = get_db_connection()

    db = banco.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    db.execute(
        "SELECT senha, nome, matricula, registrado, botcoin FROM users WHERE matricula = %s",
        (matricula,)
    )

    resultados = db.fetchmany(1)

    db.close()
    banco.close()

    if len(resultados) == 0:
        return {"erro": ERRO_SENHA}
    
    row = resultados[0]
    hash_senha = row["senha"]

    senha = request.form.get("senha")
    if (
        verifica_texto(senha) or len(senha) < 6
        or not compare_hash(senha, hash_senha)
    ):
        return {"erro": ERRO_SENHA}
    
    return {
        "nome": row["nome"],
        "matricula": row["matricula"],
        "botcoin": row["botcoin"],
        "registrado": row["registrado"]
    }


@app.route("/api/escolha", methods=["POST"])
def escolha():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({"erro": "JSON inválido ou ausente"}), 400

    matricula = data.get("matricula")
    areas = data.get("areas")

    if not matricula or not areas:
        return jsonify({"erro": "matricula e areas são obrigatórios"}), 400

    try:
        banco = get_db_connection()
        db = banco.cursor()

        for area in areas:
            db.execute(
                "INSERT INTO user_area VALUES(%s, %s)",
                (matricula, area)
            )
        
        banco.commit()
        db.close()
        banco.close()

        return jsonify({"erro": 0})

    except Exception as e:
        print(f"Erro no banco: {e}")
        return jsonify({"erro": str(e)}), 500


@app.route("/api/candidatos")
def candidatos():
    try:
        banco = get_db_connection()
        db = banco.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        db.execute(
            "SELECT * FROM users ORDER BY matricula"
        )

        rows = db.fetchall()

        db.close()
        banco.close()

        return rows
    except Exception as e:
        print(f"Erro no banco: {e}")
        return jsonify({"erro": str(e)}), 500



@app.route("/api/registrar", methods=["POST"])
def registrar():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({"erro": "JSON inválido ou ausente"}), 400

    valores = [
        (d.get("registrado"), d.get("matricula"))
        for d in data
    ]
    if not valores:
        return {
            "erro": "Nenhum dado válido"
        }, 400
    
    try:
        banco = get_db_connection()
        db = banco.cursor()

        db.executemany(
            "UPDATE users SET registrado = %s WHERE matricula = %s",
            valores
        )

        banco.commit()

        db.close()
        banco.close()
    except Exception as e:
        print(f"Erro no banco: {e}")
        return {
            "erro": str(e)
        }, 500
    
    return {
        "erro": 0
    }


@app.route("/api/usuario", methods=["POST"])
def usuario():
    mat: str = request.form.get("matricula")
    if not matricula.isnumeric():
        return {
            "erro": ERRO_MATRICULA
        }, 400

    usuario = get_user(matricula)

    try:
        if usuario["erro"]:
            print(usuario)
            return {
                "erro": ERRO_MATRICULA
            }
    
    return jsonify(usuario)


@app.route("/api/troca_senha", methods=["POST"])
def troca_senha():
    mat: str = get_request_input("matricula")
    try:
        if mat["erro"]:
            return mat
    
    if not mat.isnumeric():
        return {
            "erro": ERRO_MATRICULA
        }

    usuario = get_user(mat)
    
    try:
        if usuario["erro"]:
            print(usuario)
            return {
                "erro": ERRO_MATRICULA
            }
    
    senha_antiga = usuario["senha"]

    senha_atual = get_request_input("senhaAtual")
    try:
        if senha_atual["erro"]:
            return senha_atual
    
    senha_nova = get_request_input("senhaNova")
    try:
        if senha_nova["erro"]:
            return senha_nova

    if not senha_antiga == senha_atual:
        return {
            "erro": "Senha inválida"
        }, 400

    if senha_atual == senha_nova:
        return {
            "erro": "A senha nova tem que ser diferente"
        }, 400

    banco = get_db_connection()
    db = banco.cursor()

    db.execute(
        "UPDATE users SET senha = %s WHERE matricula = %s"
        (senha_nova, matriucla)
    )

    banco.commit()

    db.close()
    banco.close()


if __name__ == "__main__":
    app.run(debug=False)
