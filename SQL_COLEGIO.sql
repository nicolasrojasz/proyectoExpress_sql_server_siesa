IF OBJECT_ID('COLEGIO') IS NOT NULL
DROP DATABASE COLEGIO

CREATE DATABASE COLEGIO
USE COLEGIO

CREATE TABLE ASIGNATURAS(
ID INT IDENTITY(1,1) NOT NULL,
CODIGO VARCHAR(20) PRIMARY KEY NOT NULL,
NOMBRE VARCHAR(20) NOT NULL,
CREDITOS TINYINT NOT NULL,

)
SELECT* FROM ASIGNATURAS


-------------------------------------------------------------------------------------------
CREATE PROC SP_CONSULTARINFO 
(@ID int )

AS
	BEGIN
		SELECT * FROM ASIGNATURAS WHERE ID = @ID
END	

EXEC SP_CONSULTARINFO 1
--------------------------------------------------------------------------------------------

CREATE PROC SP_CREAR_ASIGNATURA 
(@CODIGO VARCHAR(20),@NOMBRE VARCHAR(20), @CREDITOS TINYINT)

AS
	BEGIN
		INSERT INTO ASIGNATURAS VALUES (@CODIGO , @NOMBRE, @CREDITOS)
END	

EXEC SP_CREAR_ASIGNATURA  'AS3', 'FISICA', 50
-----------------------------------------------------------------------------------------------



CREATE PROC SP_ACTUALIZAR_ASIGNATURA 
(@ID INT, @CODIGO VARCHAR(20),@NOMBRE VARCHAR(20), @CREDITOS TINYINT)

AS
	BEGIN
		UPDATE ASIGNATURAS SET  CODIGO = @CODIGO, NOMBRE = @NOMBRE, CREDITOS = @CREDITOS WHERE ID = @ID
END	

EXEC SP_ACTUALIZAR_ASIGNATURA  1, 'AS1', 'SOCIALES', 30







-----------------------------------------------------------------------------------------------------

CREATE TABLE ESTUDIANTES(
ID INT IDENTITY(1,1) NOT NULL,
CODIGO VARCHAR(20) PRIMARY KEY NOT NULL,
NOMBRE VARCHAR(20) NOT NULL,
APELLIDOS VARCHAR (20) NOT NULL,
SEMESTRE VARCHAR(10) NOT NULL,
CARRERA VARCHAR(20) NOT NULL,
COD_ASIGNATURA VARCHAR (20)CONSTRAINT FG_ESTUDIANTES FOREIGN KEY REFERENCES ASIGNATURAS(CODIGO)
ON UPDATE CASCADE
)
ALTER TABLE ESTUDIANTES ALTER COLUMN APELLIDOS VARCHAR(30)

----------------------------------------------------------------------------------------------------------------------------
CREATE PROC SP_MOSTRAR_ESTUDIANTES 

AS
	BEGIN
		SELECT E.ID, E.CODIGO, E.NOMBRE, E.APELLIDOS, E.SEMESTRE, E.CARRERA, A.NOMBRE AS ASIGNATURA FROM ESTUDIANTES E INNER JOIN ASIGNATURAS A ON A.CODIGO = E.COD_ASIGNATURA
END	

EXEC SP_MOSTRAR_ESTUDIANTES


-------------------------------------------------------------------------------------------------------------------------------------------

CREATE PROC SP_MOSTRAR_ID_ESTUDIANTE 
(@ID int )

AS
	BEGIN
			SELECT E.ID, E.CODIGO, E.NOMBRE, E.APELLIDOS, E.SEMESTRE, E.CARRERA, A.NOMBRE AS ASIGNATURA FROM ESTUDIANTES E INNER JOIN ASIGNATURAS A ON A.CODIGO = E.COD_ASIGNATURA WHERE E.ID  = @ID
END	


EXEC SP_MOSTRAR_ID_ESTUDIANTE 6
-----------------------------------------------------------------------------------------------------------------------------------------

CREATE PROC SP_CREAR_ESTUDIANTE 
(@CODIGO VARCHAR(20),@NOMBRE VARCHAR(20), @APELLIDOS VARCHAR(20),@SEMESTRE VARCHAR(10),@CARRERA VARCHAR(30), @COD_ASIGNATURA VARCHAR(20))

AS
	BEGIN
		INSERT INTO ESTUDIANTES VALUES (@CODIGO , @NOMBRE, @APELLIDOS,@SEMESTRE,@CARRERA, @COD_ASIGNATURA)
END	

EXEC SP_CREAR_ESTUDIANTE 'EST2','LUIS','RODRIGUEZ','5','MEDICINA','AS1'


----------------------------------------------------------------------------------------------------------------------------------------
CREATE PROC SP_ACTUALIZAR_ESTUDIANTE 
(@ID INT, @CODIGO VARCHAR(20),
@NOMBRE VARCHAR(20),
@APELLIDOS VARCHAR(20),
@SEMESTRE VARCHAR(10),
@CARRERA VARCHAR(30),
@COD_ASIGNATURA VARCHAR(20))

AS
	BEGIN
		UPDATE ESTUDIANTES SET  CODIGO = @CODIGO, NOMBRE = @NOMBRE, APELLIDOS = @APELLIDOS, SEMESTRE= @SEMESTRE,CARRERA = @CARRERA, COD_ASIGNATURA = @COD_ASIGNATURA WHERE ID = @ID
END	

EXEC SP_ACTUALIZAR_ESTUDIANTE  6, 'EST1','NICOLAS', ' HURTADO','7', 'SISTEMAS','AS1'
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------







CREATE TABLE DOCENTES(
ID INT IDENTITY(1,1),
CODIGO VARCHAR(20) PRIMARY KEY NOT NULL	,
NOMBRE VARCHAR(20) NOT NULL,
APELLIDOS VARCHAR (20) NOT NULL,
COD_ASIGNATURA VARCHAR (20)CONSTRAINT FG_DOCENTES FOREIGN KEY REFERENCES ASIGNATURAS(CODIGO)
ON UPDATE CASCADE
)


----------------------------------------------------------------------------------------------------------------------
CREATE PROC SP_MOSTRAR_DOCENTES 

AS
	BEGIN
		SELECT D.ID, D.CODIGO, D.NOMBRE, D.APELLIDOS, A.NOMBRE AS ASIGNATURA FROM DOCENTES D INNER JOIN ASIGNATURAS A ON A.CODIGO = D.COD_ASIGNATURA
END	

EXEC SP_MOSTRAR_DOCENTES

INSERT INTO DOCENTES VALUES('DOC1','ARMANDO','CONTRERAS RODRIGUEZ','AS1')

--------------------------------------------------------------------------------
CREATE PROC SP_MOSTRAR_ID_DOCENTE 
(@ID int )

AS
	BEGIN
	SELECT D.ID, D.CODIGO, D.NOMBRE, D.APELLIDOS, A.NOMBRE AS ASIGNATURA FROM DOCENTES D INNER JOIN ASIGNATURAS A ON A.CODIGO = D.COD_ASIGNATURA WHERE D.ID  = @ID
END	

EXEC SP_MOSTRAR_ID_DOCENTE 1
------------------------------------------------------------------------------------

CREATE PROC SP_CREAR_DOCENTE 
(@CODIGO VARCHAR(20),@NOMBRE VARCHAR(20), @APELLIDOS VARCHAR(20), @COD_ASIGNATURA VARCHAR(20))

AS
	BEGIN
		INSERT INTO DOCENTES VALUES (@CODIGO , @NOMBRE, @APELLIDOS, @COD_ASIGNATURA)
END	

EXEC SP_CREAR_DOCENTE 'DOC2','LUIS','CASA ROJAS','AS1'
-----------------------------------------------------------------------------------------
CREATE PROC SP_ACTUALIZAR_DOCENTE 
(@ID INT,@CODIGO VARCHAR(20),@NOMBRE VARCHAR(20), @APELLIDOS VARCHAR(20), @COD_ASIGNATURA VARCHAR(20))

AS
	BEGIN
		UPDATE DOCENTES SET  CODIGO = @CODIGO, NOMBRE = @NOMBRE, APELLIDOS = @APELLIDOS, COD_ASIGNATURA = @COD_ASIGNATURA WHERE ID = @ID
END	

EXEC SP_ACTUALIZAR_DOCENTE  3, 'DOC2','MARIO', 'ROJAS SANCHEZ', 'AS1'

-----------------------------------------------------------------------------------------------



CREATE TABLE RECORD_ACADEMICO(
ID INT IDENTITY(1,1) NOT NULL,
CODIGO VARCHAR(20) NOT NULL,
FECHA DATE NOT NULL,
PERIODO VARCHAR (5) NOT NULL,
COD_ESTUDIANTE VARCHAR (20)CONSTRAINT FG_ESTUDIANTES_RECORD FOREIGN KEY REFERENCES ESTUDIANTES(CODIGO),
COD_DOCENTE VARCHAR (20)CONSTRAINT FG_DOCENTE_RECORD FOREIGN KEY REFERENCES DOCENTES(CODIGO) ON UPDATE CASCADE,
NOTA1 DECIMAL(2,1) NOT NULL,
NOTA2 DECIMAL(2,1) NOT NULL,
PROMEDIO AS (NOTA1+NOTA2)/2
)

ALTER PROC SP_MOSTRAR_RECORDS_ACADEMICOS 

AS
	BEGIN
		SELECT R.ID, R.CODIGO, R.FECHA, R.PERIODO, E.NOMBRE AS ESTUDIANTE, E.APELLIDOS AS APELLIDOS_ESTUDIANTE,
		D.NOMBRE AS DOCENTE, D.APELLIDOS AS APELLIDOS_DOCENTE, R.NOTA1, R.NOTA2, R.PROMEDIO FROM RECORD_ACADEMICO R 
		INNER JOIN ESTUDIANTES E ON R.COD_ESTUDIANTE = E.CODIGO 
		INNER JOIN DOCENTES D  ON R.COD_DOCENTE = D.CODIGO

END	

EXEC SP_MOSTRAR_RECORDS_ACADEMICOS
------------------------------------------------------------------------------------------------------------------------------
ALTER PROC SP_MOSTRAR_ID_RECORD_ACADEMICO 
(@ID int )

AS
	BEGIN
	SELECT R.ID, R.CODIGO, R.FECHA, R.PERIODO, E.NOMBRE AS ESTUDIANTE, E.APELLIDOS AS APELLIDOS_ESTUDIANTE,
		D.NOMBRE AS DOCENTE, D.APELLIDOS AS APELLIDOS_DOCENTE, R.NOTA1, R.NOTA2, R.PROMEDIO FROM RECORD_ACADEMICO R 
		INNER JOIN ESTUDIANTES E ON R.COD_ESTUDIANTE = E.CODIGO 
		INNER JOIN DOCENTES D  ON R.COD_DOCENTE = D.CODIGO WHERE R.ID  = @ID
END	

EXEC SP_MOSTRAR_ID_RECORD_ACADEMICO 4
-------------------------------------------------------------------------------------------------------------------------
CREATE PROC SP_CREAR_RECORD_ACADEMICO 
(@CODIGO VARCHAR(20),@FECHA DATE, @PERIODO VARCHAR(5), @COD_ESTUDIANTE VARCHAR(20),@COD_DOCENTE VARCHAR(20), @NOTA1 DECIMAL(2,1), @NOTA2 DECIMAL(2,1))

AS
	BEGIN
		INSERT INTO RECORD_ACADEMICO VALUES (@CODIGO , @FECHA, @PERIODO, @COD_ESTUDIANTE,@COD_DOCENTE,@NOTA1,@NOTA2)
END	

EXEC SP_CREAR_RECORD_ACADEMICO 'RE3','2022-11-05','2','EST3','DOC3',3.0,3.4

SELECT*FROM RECORD_ACADEMICO

-----------------------------------------------------------------------------------------------------------------------------------------------
CREATE PROC SP_ACTUALIZAR_RECORD_ACADEMICO 
(@ID INT, @CODIGO VARCHAR(20),@FECHA DATE, @PERIODO VARCHAR(5), @COD_ESTUDIANTE VARCHAR(20),@COD_DOCENTE VARCHAR(20), @NOTA1 DECIMAL(2,1), @NOTA2 DECIMAL(2,1))

AS
	BEGIN
		UPDATE RECORD_ACADEMICO SET  CODIGO = @CODIGO, FECHA = @FECHA, PERIODO = @PERIODO, COD_ESTUDIANTE = @COD_ESTUDIANTE,
		COD_DOCENTE=@COD_DOCENTE,NOTA1= @NOTA1,NOTA2= @NOTA2 WHERE ID = @ID
END	

EXEC SP_ACTUALIZAR_RECORD_ACADEMICO  5, 'RE3','2022-11-05','3','EST3','DOC4',4.0,3.5

SELECT*FROM RECORD_ACADEMICO
-----------------------------------------------------------------------------------------------------------------------------------------

DELETE FROM RECORD_ACADEMICO  WHERE ID = 6