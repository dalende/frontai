import sqlite3

def instalar():
    conn = sqlite3.connect('campo.db')
    cursor = conn.cursor()
    
    # Esto borra y crea la tabla desde cero (SOLO SE EJECUTA CUANDO CORRÉS ESTE SCRIPT)
    cursor.execute("DROP TABLE IF EXISTS animales")
    cursor.execute('''
        CREATE TABLE animales (
            id TEXT PRIMARY KEY,
            descripcion TEXT,
            tipo TEXT,
            propietario TEXT,
            madre_id TEXT,
            nacimiento TEXT,
            costo REAL,
            desparasitacion TEXT
        )
    ''')
    
    datos = [
        ('Violeta90', 'Vaquillona marrón clara con careta', 'Vaquillona', 'MyD', '', '25-3', 0, '20-12'),
        ('Violeta92', 'Vaca negra con ternera marrón', 'Vaca', 'MyD', '', '25-3', 0, ''),
        ('Violeta91', 'Ternera marrón', 'Ternera', 'MyD', '92', '1-7-25', 0, '25-3'),
        ('Violeta89', 'Vaca negra preñada', 'Vaca Preñada', 'MyD', '', '1-11-23', 0, '25-3'),
        ('Violeta93', 'Vaquillona Marrón clara', 'Vaquillona', 'Pancho', '', '1138.790', 400, '25-3')
    ]
    
    cursor.executemany('INSERT INTO animales VALUES (?,?,?,?,?,?,?,?)', datos)
    conn.commit()
    conn.close()
    print("✅ Base de datos 'campo.db' creada y poblada con éxito.")

if __name__ == "__main__":
    instalar()