from datetime import datetime
from flask import Flask, request, jsonify
import os
import psycopg2
from werkzeug.security import generate_password_hash, check_password_hash
from zoneinfo import ZoneInfo


import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

'''
    Constantes
'''
DATA_INICIO: datetime = datetime(2026, 3, 25, 19, 0, 0, 0, tzinfo=ZoneInfo("America/Sao_Paulo"))
DANGEROUS_CHARS: set = set(""",'";?""")
ERRO_NOME = 1
ERRO_MATRICULA = 2
ERRO_EMAIL = 3
ERRO_TEL = 4
ERRO_SENHA = 5

EMAIL_ADDRESS = os.getenv('EMAIL_ADDRESS')
EMAIL_PASSWORD = os.getenv('EMAIL_PASSWORD')
SMTP_SERVER = os.getenv('SMTP_SERVER')
SMTP_PORT = int(os.getenv('SMTP_PORT'))


'''
    Funções auxiliares
'''
def get_db_connection():
    # O psycopg2 entende perfeitamente a URL do Supabase
    conn = psycopg2.connect(os.getenv("DATABASE_URL"))
    return conn


def comecou_processo(data: datetime):
    return data >= DATA_INICIO 


def verifica_texto(texto: str):
    ''' 
        1 -> Texto com problema
        0 -> Texto válido
    '''
    return (
        set(texto) & DANGEROUS_CHARS or not texto
    )


def create_hash(texto: str):
    return generate_password_hash(texto)


def compare_hash(texto: str, hash: str):
    return check_password_hash(hash, texto)


def get_user(mat: str) -> dict:
    try:
        banco = get_db_connection()
        db = banco.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        db.execute(
            "SELECT * FROM users WHERE matricula = %s",
            (mat,)
        )

        resultados = db.fetchmany(1)

        if len(resultados) != 1:
            return {
                "erro": ERRO_MATRICULA
            }

        db.close()
        banco.close()
    except Exception as e:
        print(f"Erro no banco: {e}")
        return {
            "erro": str(e)
        }
    
    return resultados[0]


def send_verification_email(to_email, code):
    # Compose the email
    msg = MIMEMultipart()
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = to_email
    msg['Subject'] = 'Your Password Reset Code'

    body = f"Your verification code is: {code}"
    msg.attach(MIMEText(body, 'plain'))

    # Connect to SMTP server and send email
    try:
        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()  # Secure connection
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.send_message(msg)
        server.quit()
        print(f"Verification code sent to {to_email}")
        return 0
    except Exception as e:
        print("Failed to send email:", e)
        return e
