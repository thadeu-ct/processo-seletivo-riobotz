from datetime import datetime
from flask import Flask, request, jsonify
import os
import psycopg2
from werkzeug.security import generate_password_hash, check_password_hash

'''
    Constantes
'''
DATA_INICIO: datetime = datetime(2026, 3, 30)
DANGEROUS_CHARS: set = set(""",'";?""")
ERRO_NOME = 1
ERRO_MATRICULA = 2
ERRO_EMAIL = 3
ERRO_TEL = 4
ERRO_SENHA = 5


'''
    Funções auxiliares
'''
def get_db_connection():
    # O psycopg2 entende perfeitamente a URL do Supabase
    conn = psycopg2.connect(os.getenv("DATABASE_URL"))
    return conn


def comecou_processo(data: datetime):
    return data.date() >= DATA_INICIO.date()


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
