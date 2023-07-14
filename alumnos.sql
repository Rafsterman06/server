-------------------------
-- autor@ Rafsterman06 --
-------------------------

------------------------------
-- Creando la base de datos --
------------------------------

CREATE DATABASE Escuela;

----------------------------------------------------------------
----------------------------------------------------------------

------------------------------------
-- Seleccionando la base de datos --
------------------------------------
USE Escuela;

----------------------------------------------------------------
----------------------------------------------------------------

------------------------
-- Creando las tablas --
------------------------

--
-- Creando la tabla curso
--

CREATE TABLE curso(
    id_curso INT PRIMARY KEY NOT NULL,
    nombre VARCHAR(25) NOT NULL
);

--
-- Creando la tabla alumno
--
CREATE TABLE alumno(
    matricula INT PRIMARY KEY NOT NULL,
    nombre VARCHAR(25) NOT NULL ,
    cuatrimestre INT NOT NULL
);

--
-- Creando la tabla inscrito
--

CREATE TABLE inscrito(
    matricula INT NOT NULL,
    id_curso INT NOT NULL,
    FOREIGN KEY (id_curso) REFERENCES curso(id_curso) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (matricula) REFERENCES alumno(matricula) ON DELETE CASCADE ON UPDATE CASCADE
);

--
-- Creando la tabla bajas
--

CREATE TABLE bajas(
    matricula INT NOT NULL ,
    nombre VARCHAR(25) NOT NULL ,
    cuatrimestre INT NOT NULL 
);

----------------------------------------------------------------
----------------------------------------------------------------

-----------------------------------
-- INSERTANDO DATOS A LAS TABLAS --
-----------------------------------

--
-- INSERTANDO REGISTROS A LA TABLA curso
--

INSERT INTO curso (id_curso,nombre) VALUES (1,'DataBase');

--
-- INSERTANDO REGISTROS A LA TABLA alumno
--

INSERT INTO alumno (matricula,nombre,cuatrimestre) VALUES (40,'PEDRO',4);

INSERT INTO alumno (matricula,nombre,cuatrimestre) VALUES (1,'PABLO',3);

INSERT INTO alumno (matricula,nombre,cuatrimestre) VALUES (4,'GOKU',5);

--
-- INSERTANDO REGISTROS A LA TABLA inscrito
--

INSERT INTO inscrito (matricula,id_curso) VALUES (1,1);

----------------------------------------------------------------
----------------------------------------------------------------

-----------------
-- ## OnUpdate --
-- ## OnDelate --
-- ## Cascade  --
-- ## Restrict --
-----------------

