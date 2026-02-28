from dotenv import load_dotenv
from flask import Flask, request
from functions import *
import os
import sqlite3

load_dotenv()

banco = sqlite3.connect(os.getenv("DATABASE"))
db = banco.cursor()

app = Flask(__name__)
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
        len(tel) != 14 or verifica_texto(tel)
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
    
    db.execute(
        "INSERT INTO users VALUES (?, ?, ?, ?, ?, 0)",
        matricula, nome, email, tel, create_hash(senha)
    )

    banco.commit()

    return {
        "erro": 0
    }


@app.route("/api/login", methods=["POST"])
def login():
    email = request.form.get("email")
    if not email.find("@") or email.find(DANGEROUS_CHARS):
        return {
            "erro": ERRO_EMAIL
        }
    
    db.execute(
        "SELECT senha, nome FROM users WHERE email = ?",
        email
    )

    row = db.fetchmany(1)[0]
    hash = row["senha"]

    senha = request.form.get("senha")
    if (
        senha.find(DANGEROUS_CHARS) or len(senha) < 6
        or not compare_hash(senha, hash)
    ):
        return {
            "erro": ERRO_SENHA
        }
    
    return {
        "nome": row["nome"]
    }


if __name__ == "__main__":
    app.run(debug=False)