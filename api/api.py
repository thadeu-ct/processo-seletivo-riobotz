from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS
from .functions import *
import psycopg2
import psycopg2.extras
import os
import random


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

    try:
        banco = get_db_connection()
        db = banco.cursor()

        db.execute(
            "INSERT INTO users VALUES (%s, %s, %s, %s, %s, False, 0)",
            (matricula, nome, email, tel, create_hash(senha))
        )

        banco.commit()

        db.close()
        banco.close()
    except Exception as e:
        print(f"Erro no banco: {e}")
        return {
            "erro": str(e)
        }

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
    
    user = get_user(matricula)
    
    if "error" in user.keys():
        return user, 500
    
    hash_senha = user["senha"]

    senha = request.form.get("senha")
    if (
        verifica_texto(senha) or len(senha) < 6
        or not compare_hash(senha, hash_senha)
    ):
        return {"erro": ERRO_SENHA}
    
    return {
        "nome": user["nome"],
        "matricula": user["matricula"],
        "botcoin": user["botcoin"],
        "registrado": user["registrado"]
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
        print(f"Erro no banco: {e}")  # This will appear in your server logs
        return jsonify({"erro": str(e)}), 500


@app.route("/api/candidatos", methods=["POST"])
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

        # for d in data:
        #     matricula = d.get("matricula")
        #     registrado = d.get("registrado")

        #     db.execute(
        #         "UPDATE users SET registrado = %s WHERE matricula = %s",
        #         (registrado, matricula)
        #     )
        
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


@app.route("/api/trocar-senha", methods=["POST"])
def trocarSenha():
    mat: str = request.form.get("matricula")
    email: str = request.form.get("email")

    if not mat.isnumeric():
        return {
            "erro": ERRO_MATRICULA
        }, 400

    if verifica_texto(email):
        return {
            "erro": ERRO_EMAIL
        }, 400
    
    codigo: str = str(random.randint(100000, 999999))

    res = send_verification_email(email, codigo)
    if not res == 0:
        return {
            "erro": "Erro ao tentar enviar email"
        }, 400

    banco = get_db_connection()
    db = banco.cursor()

    db.execute(
        "INSERT INTO codigos VALUES (%s, %s)",
        (mat, codigo)
    )

    banco.commit()

    db.close()
    banco.close()

    return {}


if __name__ == "__main__":
    app.run(debug=False)
