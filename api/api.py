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
    if not matricula or not matricula.isnumeric():
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
        return handle_error(e), 500
        # print(e)
        # return jsonify({
        #     "erro": str(e)
        # }), 500

    return {
        "erro": 0
    }


@app.route("/api/login", methods=["POST"])
def login():
    matricula = request.form.get("matricula")
    if not matricula or not matricula.isnumeric():
        return {
            "erro": ERRO_MATRICULA
        }, 400
    
    user = get_user(matricula)
    
    if "erro" in user.keys():
        return user, 500
    
    hash_senha = user["senha"]

    senha = request.form.get("senha")
    if (
        verifica_texto(senha) or len(senha) < 6
        or not compare_hash(senha, hash_senha)
    ):
        return {"erro": ERRO_SENHA}, 400
    
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
        return handle_error(e), 500
        # print(e)
        # return jsonify({
        #     "erro": str(e)
        # }), 500


@app.route("/api/areas", methods=["POST"])
def areas():
    mat: str = request.form.get("matricula")
    if not mat or not mat.isnumeric():
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
        return handle_error(e), 500
        # print(e)
        # return jsonify({
        #     "erro": str(e)
        # }), 500


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

        return jsonify(rows)
    except Exception as e:
        return handle_error(e), 500
        # print(e)
        # return jsonify({
        #     "erro": str(e)
        # }), 500


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
        return handle_error(e), 500
        # print(e)
        # return jsonify({
        #     "erro": str(e)
        # }), 500
    
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
        return handle_error(e), 500
        # print(e)
        # return jsonify({
        #     "erro": str(e)
        # }), 500

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
    return {"erro": "Não implementado"}


@app.route("/api/user/trocar-senha", methods=["POST"])
def userTrocarSenha():
    data = request.get_json(silent=True)
    mat = data.get("matricula") if data else request.form.get("matricula")
    if not mat or not mat.isnumeric():
        return {
            "erro": ERRO_MATRICULA
        }
    
    user = get_user(mat)
    if "erro" in user.keys():
        return jsonify(user), 500
    
    senhaNova = data.get("senhaNova") if data else request.form.get("senhaNova")
    if not senhaNova or verifica_texto(senhaNova) or compare_hash(senhaNova, user["senha"]):
        return {
            "erro": ERRO_SENHA
        }
    
    try:
        banco = get_db_connection()
        db = banco.cursor()

        db.execute(
            "UPDATE users SET senha = %s WHERE matricula = %s",
            (create_hash(senhaNova), mat)
        )

        banco.commit()

        db.close()
        banco.close()
        return {
            "msg": "Senha alterada com sucesso"
        }
    except Exception as e:
        return handle_error(e), 500


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
        return handle_error(e), 500
        # print(e)
        # return jsonify({
        #     "erro": str(e)
        # }), 500

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
                JSON_AGG(wa.area_nome) FILTER (WHERE wa.area_nome IS NOT NULL) AS areas,
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
        return handle_error(e), 500

    

@app.route("/api/workshops/area", methods=["POST"])
def areaWorkshops():
    data = request.get_json(silent=True)
    area: str = data.get("area") if data else request.form.get("area")

    try:
        banco = get_db_connection()
        db = banco.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

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
                JSON_AGG(wa.area_nome) FILTER (WHERE wa.area_nome IS NOT NULL) AS areas,
                TO_CHAR(w.data, 'DD/MM') || ', ' ||
                TO_CHAR(w.data, 'Dy') || ', ' ||
                TO_CHAR(w.data, 'HH24:MI') || '-' ||
                TO_CHAR(w.data_fim, 'HH24:MI') AS "dataHora"
            FROM workshops w
            JOIN workshops_areas wa ON w.id = wa.workshop_id
            WHERE wa.area_nome = %s
            GROUP BY w.id;
            """,
            (area,)
        )

        rows = db.fetchall()

        db.close()
        banco.close()

        return jsonify(rows)
    except Exception as e:
        return handle_error(e), 500
    

@app.route("/api/workshops/inscrever", methods=["POST"])
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

        db.execute(
            "INSERT INTO user_workshop VALUES (%s, %s)",
            (mat, id_w)
        )

        banco.commit()

        db.close()
        banco.close()

        return {
            "erro": 0,
            "inscricao": 1
        }
    except Exception as e:
        return handle_error(e), 500
        # print(e)
        # return jsonify({
        #     "erro": str(e)
        # }), 500


@app.route("/api/workshops/inscritos", methods=["POST"])
def inscritosWorkshop():
    data = request.get_json(silent=True)
    work_id: int = int(data.get("workshop_id")) if data else int(request.form.get("workshop_id"))

    try:
        banco = get_db_connection()
        db = banco.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        db.execute(
            """
            SELECT u.matricula AS matricula, u.nome AS nome
            FROM user_workshop AS w
            JOIN users AS u ON w.matricula = u.matricula
            WHERE w.id = %s
            ORDER BY u.nome
            """,
            (work_id,)
        )

        rows = db.fetchall()

        db.close()
        banco.close()

        return jsonify(rows)
    except Exception as e:
        return handle_error(e), 500    


@app.route("/api/workshops/salvar-presenca", methods=["POST"])
def presencaWorkshops():
    data = request.get_json(silent=True)
    mats: tuple[str, int] = [
        (int(d.get("botcoins")), d.get("matricula"))
        for d in data
    ]

    try:
        banco = get_db_connection()
        db = banco.cursor()

        db.executemany(
            "UPDATE users SET botcoins = botcoins + %s WHERE matricula = %s",
            mats
        )

        banco.commit()

        db.close()
        banco.close()

        return {
            "erro": 0
        }
    except Exception as e:
        return handle_error(e), 500

@app.route("/api/user/workshops", methods=["POST"])
def getUserWorkshops():
    data = request.get_json(silent=True)
    mat = data.get("matricula") if data else request.form.get("matricula")

    if not mat:
        return jsonify({"erro": "Matrícula ausente"}), 400

    try:
        banco = get_db_connection()
        db = banco.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        db.execute("SELECT id FROM user_workshop WHERE matricula = %s", (str(mat),))
        
        rows = db.fetchall()
        db.close()
        banco.close()
        
        return jsonify(rows)
    except Exception as e:
        print(f"Erro na rota user/workshops: {e}")
        return jsonify({"erro": str(e)}), 500

'''
------------------ Funções das perguntas ------------------
'''
@app.route("/api/quiz/<int:workshop_id>", methods=["GET"])
def get_quiz_data(workshop_id):
    try:
        banco = get_db_connection()
        db = banco.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        db.execute("SELECT id, enunciado, imagem_url, resposta_correta_index FROM perguntas WHERE workshop_id = %s", (workshop_id,))
        perguntas_raw = db.fetchall()

        quiz_formatado = []

        for p in perguntas_raw:
            db.execute("SELECT texto FROM opcoes WHERE pergunta_id = %s ORDER BY id", (p['id'],))
            opcoes = [row['texto'] for row in db.fetchall()]
            
            quiz_formatado.append({
                "pergunta": p['enunciado'],
                "imagem": p['imagem_url'],
                "opcoes": opcoes,
                "respostaCorreta": p['resposta_correta_index']
            })

        db.close()
        banco.close()
        return jsonify(quiz_formatado)
    except Exception as e:
        return jsonify({"erro": str(e)}), 500


@app.route("/api/pergunta/add", methods=["POST"])
def addPergunta():
    texto: str = request.form.get("texto")
    workshop_id: int = int(request.form.get("id"))
    image = request.files.get("image")

    if not image:
        return {
            "erro": "Nenhuma imagem foi enviada"
        }

    image_bi = image.read()

    try:
        banco = get_db_connection()
        db = banco.cursor()

        db.execute(
            "INSERT INTO perguntas VALUES (%s, %s, %s)",
            (texto, image_bi, workshop_id)
        )

        banco.commit()

        db.close()
        banco.close()
    except Exception as e:
        return handle_error(e), 500
        # print(e)
        # return jsonify({
        #     "erro": str(e)
        # }), 500


@app.route("/api/perguntas/get", methods=["POST"])
def getPerguntas():
    try:
        banco = get_db_connection()
        db = banco.cursor()

        db.execute(
            "SELECT texto FROM perguntas ORDER BY texto"
        )

        rows = db.fetchall()

        db.close()
        banco.close()

        return jsonify(rows)
    except Exception as e:
        return handle_error(e), 500
        # print(e)
        # return jsonify({
        #     "erro": str(e)
        # }), 500
    

@app.route("/api/opcoes/add", methods=["POST"])
def addOpcao():
    pergunta: str = request.form.get("pergunta")
    texto: str = request.form.get("opcao")

    try:
        banco = get_db_connection()
        db = banco.cursor()

        db.execute(
            "INSERT INTO opcoes VALUES (%s, %s)",
            (texto, pergunta)
        )

        banco.commit()

        db.close()
        banco.close()
    except Exception as e:
        return handle_error(e), 500
        # print(e)
        # return jsonify({
        #     "erro": str(e)
        # }), 500


'''
------------------ Funções de Status do Sistema ------------------
'''
@app.route("/api/status-sistema", methods=["GET"])
def getStatus():
    try:
        banco = get_db_connection()
        db = banco.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        # Busca o valor da coluna 'manutencao' na tabela de configs
        db.execute("SELECT manutencao FROM configuracoes LIMIT 1")
        row = db.fetchone()

        db.close()
        banco.close()

        # Se a tabela estiver vazia, assume que não está em manutenção
        status = row["manutencao"] if row else False
        
        return jsonify({"manutencao": status})
    except Exception as e:
        return handle_error(e), 500


@app.route("/api/set-manutencao", methods=["POST"])
def setManutencao():
    data = request.get_json(silent=True)
    if not data:
        return jsonify({"erro": "JSON inválido"}), 400

    novo_status = data.get("status")
    admin_mat = data.get("admin_mat")

    # Verifica se quem está tentando mudar é realmente um admin (segurança extra no back)
    # Aqui o Telhado pode validar contra a lista de admins dele
    
    try:
        banco = get_db_connection()
        db = banco.cursor()

        # Atualiza o status global do sistema
        db.execute("UPDATE configuracoes SET manutencao = %s", (novo_status,))
        
        banco.commit()
        db.close()
        banco.close()

        return jsonify({"erro": 0})
    except Exception as e:
        return handle_error(e), 500
    

'''
------------------ Funções de Perfil (Dados Completos) ------------------
'''
@app.route("/api/perfil/get", methods=["POST"])
def get_perfil_completo():
    # Tenta pegar do JSON (React costuma mandar assim no fetch com body)
    data = request.get_json(silent=True)
    mat = data.get("matricula") if data else request.form.get("matricula")

    if not mat:
        return jsonify({"erro": "Matrícula ausente"}), 400

    try:
        banco = get_db_connection()
        # O RealDictCursor é ótimo, mas se falhar, o erro 500 aparece aqui
        db = banco.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        # 1. Busca dados básicos
        db.execute(
            "SELECT nome, matricula, email, telefone AS tel FROM users WHERE matricula = %s",
            (str(mat),) # Garantindo que vá como string
        )
        user_data = db.fetchone()

        if not user_data:
            db.close()
            banco.close()
            return jsonify({"erro": "Usuário não encontrado"}), 404

        # 2. Busca as áreas (Tratando o caso de não ter nenhuma)
        db.execute(
            "SELECT area_nome FROM user_area WHERE user_matricula = %s",
            (str(mat),)
        )
        areas_rows = db.fetchall()
        
        # Se áreas_rows for None ou vazio, áreas vira uma lista vazia []
        user_data["areas"] = [row["area_nome"] for row in areas_rows] if areas_rows else []

        db.close()
        banco.close()

        return jsonify(user_data)

    except Exception as e:
        print(f"ERRO NO PERFIL: {e}") # Isso vai aparecer no log do seu terminal/Vercel
        return jsonify({"erro": str(e)}), 500


@app.errorhandler(Exception)
def errorPage(e):
    print(e)
    return {"erro": str(e)}, 500


if __name__ == "__main__":
    app.run(debug=False)
