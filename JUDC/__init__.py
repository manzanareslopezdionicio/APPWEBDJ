"""
Shim opcional para usar PyMySQL como reemplazo de MySQLdb.
Esto facilita la conexión en entornos Windows si prefieres instalar
`PyMySQL` en lugar de `mysqlclient`.

Si instalas `PyMySQL` (pip install PyMySQL), este código registra
PyMySQL como el adaptador MySQLdb que Django espera.
"""

try:
	import pymysql
	pymysql.install_as_MySQLdb()
except Exception:
	# Si PyMySQL no está instalado, no hacemos nada. Si usas
	# `mysqlclient`, Django funcionará sin este shim.
	pass
