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

'''
------------------ Funções de Login/Cadastro ------------------
'''

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
    
    if "erro" in user.keys():
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


'''
------------------ Funções de Áreas da Equipe ------------------
'''
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

        db.execute(
            "SELECT area_nome FROM user_area WHERE user_matricula=%s",
            (matricula,)
        )

        areas_atuais = {row[0] for row in db.fetchall()}
        areas_novas = set(areas)

        insert_areas = areas_novas - areas_atuais
        remove_areas = areas_atuais - areas_novas 

        for area in insert_areas:
            db.execute(
                "INSERT INTO user_area VALUES(%s, %s)",
                (matricula, area)
            )

        for area in remove_areas:
            db.execute(
                "DELETE FROM user_area WHERE user_matricula = %s AND area_nome = %s",
                (matricula, area)
            )
        
        banco.commit()
        db.close()
        banco.close()

        return jsonify({"erro": 0})
    except Exception as e:
        print(f"Erro no banco: {e}")  # This will appear in your server logs
        return jsonify({"erro": str(e)}), 500


@app.route("/api/areas", methods=["POST"])
def areas():
    mat: str = request.form.get("matricula")
    if not mat.isnumeric():
        return {
            "erro": ERRO_MATRICULA
        }
    
    try:
        banco = get_db_connection()
        db = banco.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        db.execute(
            "SELECT area_nome FROM user_area WHERE user_matricula = %s",
            (mat,)
        )

        areas = [row["area_nome"] for row in db.fetchall()]

        db.close()
        banco.close()

        return {
            "erro": 0,
            "areas": areas
        }
    except Exception as e:
        print(e)
        return {
            "erro": str(e)
        }, 500


'''
------------------ Funções de Admin ------------------
'''
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


'''
------------------ Funções de Trocar senha ------------------
'''
@app.route("/api/solicitar-codigo", methods=["POST"])
def geraCodigo():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({"erro": "JSON inválido ou ausente"}), 400
    
    mat: str = data.get("matricula")
    email: str = data.get("email")

    if not mat.isnumeric():
        return {
            "erro": ERRO_MATRICULA
        }, 400

    if (
        not email.find("@") or verifica_texto(email)
    ):
        return {
            "erro": ERRO_EMAIL
        }, 400
    
    codigo: str = str(random.randint(100000, 999999))

    res = send_verification_email(email, codigo)
    if not res == 0:
        return {
            "erro": "Erro ao tentar enviar email"
        }, 400

    try:
        banco = get_db_connection()
        db = banco.cursor()

        db.execute(
            "INSERT INTO codigos VALUES (%s, %s, %s)",
            (mat, codigo, datetime.now())
        )

        banco.commit()

        db.close()
        banco.close()
    except Exception as e:
        print(e)
        return {
            "erro": str(e)
        }

    return {
        "erro": 0
    }


# Incompleto
@app.route("/api/trocar-senha", methods=["POST"])
def trocarSenha():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({"erro": "JSON inválido ou ausente"}), 400
    
    mat: str = data.get("matricula")
    cod = data.get("codigo")
    senha = data.get("senha")
    return


'''
------------------ Funções de Botcoin ------------------
'''
@app.route("/api/alteracaoBotcoin/", methods=["POST"])
def alteracaoBotcoin():
    mat: str = request.form.get("matricula")
    ganho: int = int(request.form.get("botcoin"))

    try:
        banco = get_db_connection()
        db = banco.cursor()

        db.execute(
            "UPDATE users SET botcoins = botcoins + %s WHERE matricula = %s",
            (ganho, mat)
        )

        banco.commit()

        db.close()
        banco.close()
    except Exception as e:
        print(e)
        return {
            "erro": str(e)
        }

    user = get_user(mat)
    if ("erro" in user.keys()):
        return user, 400

    return {
        "botcoin": user["botcoin"]
    }


'''
------------------ Funções dos Workshops ------------------
'''
@app.route("/api/workshops", methods=["POST"])
def getworkshops():
    try:
        banco = get_db_connection()
        db = banco.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        #  SELECT w.id, w.nome, w.descricao AS desc, w.link, w.data, w.data_fim, w.is_online AS online, JSON_AGG(wa.area_nome) AS areas
        # FROM workshops w JOIN workshops_areas wa ON w.id = wa.workshop_id
        # GROUP BY w.id;

        db.execute(
            """
            SELECT 
                w.id,
                w.nome AS titulo,
                w.descricao,
                w.link,
                CASE 
                    WHEN w.is_online THEN 'Online'
                    ELSE 'Presencial'
                END AS tipo,
                JSON_AGG(wa.area_nome) AS areas,
                TO_CHAR(w.data, 'DD/MM') || ', ' ||
                TO_CHAR(w.data, 'Dy') || ', ' ||
                TO_CHAR(w.data, 'HH24:MI') || '-' ||
                TO_CHAR(w.data_fim, 'HH24:MI') AS "dataHora"
            FROM workshops w
            JOIN workshops_areas wa ON w.id = wa.workshop_id
            GROUP BY w.id;
            """
        )

        rows = db.fetchall()

        db.close()
        banco.close()

        return jsonify(rows)
    except Exception as e:
        print(e)
        return {
            "erro": str(e)
        }
    

@app.route("/api/workshops/inscrever")
def inscrever_workshops():
    mat: str = request.form.get("matricula")
    id_w: int = int(request.form.get("id"))

    if not mat.isnumeric():
        return {
            "erro": ERRO_MATRICULA
        }
    
    try:
        banco = get_db_connection()
        db = banco.cursor()



        db.close()
        banco.close()
    except Exception as e:
        print(e)
        return {
            "erro": str(e)
        }


if __name__ == "__main__":
    app.run(debug=False)
