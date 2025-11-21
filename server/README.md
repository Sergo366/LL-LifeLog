Docker compose:
Run: docker compose up -d
Stop: docker compose down
Restart: docker compose restart postgres
Active containers: docker ps

user: postgres
password: pass123

Postgres:
Creat DB: CREATE DATABASE <name>;
Check list of DBs: \l
Quite: q
Run postgres in terminal: docker exec -it <service name> psql -U postgres
\c <name of database> -> connect with database
\dt -> check what you have in database
select * from <schema name>;
