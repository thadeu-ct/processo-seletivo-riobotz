from dotenv import load_dotenv
from flask import Flask, request
from flask_cors import CORS
from .functions import *
import psycopg2
import psycopg2.extras
import os
import sqlite3

load_dotenv()

app = Flask(__name__)
CORS(app)
app.config["SESSION_PERMANENT"] = False

def get_db_connection():
    # O psycopg2 entende perfeitamente a URL do Supabase
    conn = psycopg2.connect(os.getenv("DATABASE_URL"))
    return conn

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
    email = request.form.get("email")
    if not email.find("@") or verifica_texto(email):
        return {
            "erro": ERRO_EMAIL
        }
    
    banco = get_db_connection()

    db = banco.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    db.execute(
        "SELECT senha, nome, matricula, botcoin FROM users WHERE email = %s",
        (email,)
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
        "mat": row["matricula"],
        "botcoin": row["botcoin"]
    }


@app.route("/api/escolha", methods=["POST"])
def escolha():
    matricula = request.form.get("matricula")
    areas = request.form.get("areas")

    banco = get_db_connection()
    db = banco.cursor()

    for area in areas:
        db.execute(
            "INSERT INTO user_areas VALUES(%s, %s)",
            (matricula, area)
        )
    
    banco.commit()

    db.close()
    banco.close()

    return {}


if __name__ == "__main__":
    app.run(debug=False)
