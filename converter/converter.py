import csv

def txt_para_sql(nome_arquivo_txt, nome_tabela, delimitador=','):
    comandos_sql = []
    
    with open(nome_arquivo_txt, 'r', encoding='utf-8') as arquivo_txt:
        leitor = csv.reader(arquivo_txt, delimiter=delimitador)
        cabecalho = next(leitor)  # Pega o cabeçalho (nomes das colunas)
        
        for linha in leitor:
            valores = []
            for item in linha:
                # Trata aspas simples dentro dos valores
                valor_formatado = f"'{item.replace("'", "''")}'"
                valores.append(valor_formatado)
                
            comando = f"INSERT INTO {nome_tabela} ({', '.join(cabecalho)}) VALUES ({', '.join(valores)});"
            comandos_sql.append(comando)
            
    return comandos_sql

# Exemplo de uso:
nome_do_arquivo = 'dados.txt'  # Substitua pelo nome do seu arquivo
nome_da_tabela = 'usuarios'    # Substitua pelo nome da sua tabela
separador = ','               # Delimitador: ',' para CSV, '\t' para tabulação, etc.

comandos_gerados = txt_para_sql(nome_do_arquivo, nome_da_tabela, separador)

with open('dados.sql', 'w', encoding='utf-8') as arquivo_sql:
    for comando in comandos_gerados:
        arquivo_sql.write(comando + '\n')

print(f"Comandos SQL gerados e salvos no arquivo 'dados.sql'.")