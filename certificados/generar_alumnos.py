"""Convierte alumnos_cursos.xlsx en certificados/alumnos.js.

Uso (desde cualquier carpeta):
    python certificados/generar_alumnos.py

El Excel debe tener las columnas ESTUDIANTE y CURSO. Para agregar un curso
nuevo, añade su nombre (tal como aparece en el Excel) al mapa CURSOS y crea
la entrada correspondiente en el catálogo EVENTS de app.js.
"""

import json
import sys
import unicodedata
from pathlib import Path

import openpyxl

AQUI = Path(__file__).resolve().parent
EXCEL = AQUI.parent / 'alumnos_cursos.xlsx'
SALIDA = AQUI / 'alumnos.js'

# Nombre del curso en el Excel → identificador del evento en app.js
CURSOS = {
    'CIENCIA DE DATOS PROFESIONAL CON PYTHON + IA': 'curso-ciencia-datos',
    'INTELIGENCIA ARTIFICIAL PARA LA INVESTIGACIÓN CIENTÍFICA': 'curso-ia-investigacion',
}

PARTICULAS = {'de', 'del', 'la', 'las', 'los', 'y'}


def sin_tildes(texto):
    return ''.join(c for c in unicodedata.normalize('NFD', texto)
                   if unicodedata.category(c) != 'Mn').lower()


def tipo_titulo(nombre):
    palabras = nombre.lower().split(' ')
    return ' '.join(p if i > 0 and p in PARTICULAS else p.capitalize()
                    for i, p in enumerate(palabras))


def limpiar(crudo):
    """Devuelve (nombre limpio, fue_convertido_a_tipo_titulo)."""
    nombre = ' '.join(str(crudo).split())
    if nombre.isupper() or nombre.islower():
        return tipo_titulo(nombre), True
    return nombre, False


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    hoja = openpyxl.load_workbook(EXCEL, read_only=True).worksheets[0]
    filas = hoja.iter_rows(values_only=True)

    encabezados = [str(c or '').strip().upper() for c in next(filas)]
    try:
        col_nombre = encabezados.index('ESTUDIANTE')
        col_curso = encabezados.index('CURSO')
    except ValueError:
        sys.exit(f'ERROR: el Excel debe tener las columnas ESTUDIANTE y CURSO (tiene {encabezados}).')

    alumnos = {clave: [] for clave in CURSOS.values()}
    convertidos, minusculas, repetidos = [], [], []

    for n, fila in enumerate(filas, start=2):
        crudo, curso = fila[col_nombre], fila[col_curso]
        if not crudo or not str(crudo).strip():
            continue
        curso = ' '.join(str(curso or '').split()).upper()
        if curso not in CURSOS:
            sys.exit(f'ERROR: fila {n}: curso sin mapear en CURSOS: "{curso}".')
        clave = CURSOS[curso]

        nombre, convertido = limpiar(crudo)
        if nombre in alumnos[clave]:
            repetidos.append((clave, nombre))
            continue
        alumnos[clave].append(nombre)

        if convertido:
            convertidos.append((clave, nombre))
        elif any(p[0].islower() and p not in PARTICULAS for p in nombre.split(' ')):
            minusculas.append((clave, nombre))

    lineas = ['// Generado por generar_alumnos.py desde alumnos_cursos.xlsx — no editar a mano',
              'const ALUMNOS = {']
    for clave, nombres in alumnos.items():
        lineas.append(f"  '{clave}': [")
        lineas += [f'    {json.dumps(nombre, ensure_ascii=False)},' for nombre in nombres]
        lineas.append('  ],')
    lineas.append('};')
    SALIDA.write_text('\n'.join(lineas) + '\n', encoding='utf-8')

    print(f'Escrito {SALIDA.name}:')
    for clave, nombres in alumnos.items():
        print(f'  {clave}: {len(nombres)} alumnos')

    # Misma persona escrita distinto en dos cursos (un nombre contiene al otro)
    distintos = []
    claves = list(alumnos)
    for i, a in enumerate(claves):
        for b in claves[i + 1:]:
            for na in alumnos[a]:
                for nb in alumnos[b]:
                    ta, tb = set(sin_tildes(na).split()), set(sin_tildes(nb).split())
                    if na != nb and (ta <= tb or tb <= ta):
                        distintos.append((na, nb))

    print('\n--- Dudas para revisar en el Excel ---')
    informe = [
        ('Estaban en MAYÚSCULAS/minúsculas; se pasaron a Tipo Título (revisar tildes):',
         [f'{n}  [{c}]' for c, n in convertidos]),
        ('Tienen una palabra que empieza en minúscula:',
         [f'{n}  [{c}]' for c, n in minusculas]),
        ('Misma persona escrita distinto en dos cursos:',
         [f'{a}  ≠  {b}' for a, b in distintos]),
        ('Filas repetidas dentro del mismo curso (se omitieron):',
         [f'{n}  [{c}]' for c, n in repetidos]),
    ]
    for titulo, items in informe:
        if items:
            print(f'\n{titulo}')
            for item in items:
                print(f'  - {item}')
    if not any(items for _, items in informe):
        print('Ninguna.')


if __name__ == '__main__':
    main()
