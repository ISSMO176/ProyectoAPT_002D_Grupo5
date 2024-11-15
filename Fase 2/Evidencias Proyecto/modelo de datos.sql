-- Tabla CursoCapacitacion
CREATE TABLE CursoCapacitacion (
    id_curso SERIAL PRIMARY KEY,
    nombre_curso VARCHAR(255) NOT NULL,
    descripcion_curso TEXT NOT NULL,
    fecha_creacion TIMESTAMP NOT NULL,
    fecha_limite TIMESTAMP,
    estado_curso BOOLEAN NOT NULL
);

-- Tabla Modulo
CREATE TABLE Modulo (
    id_modulo SERIAL PRIMARY KEY,
    nombre_modulo VARCHAR(255) NOT NULL,
    descripcion_modulo TEXT NOT NULL,
    cursoId INT NOT NULL,
    CONSTRAINT fk_modulo_curso FOREIGN KEY (cursoId) REFERENCES CursoCapacitacion (id_curso)
);

-- Tabla LeccionCurso
CREATE TABLE LeccionCurso (
    id_leccion SERIAL PRIMARY KEY,
    nombre_leccion VARCHAR(255) NOT NULL,
    descripcion_leccion TEXT NOT NULL,
    fecha_de_creacion_leccion TIMESTAMP NOT NULL,
    moduloId INT NOT NULL,
    CONSTRAINT fk_leccion_modulo FOREIGN KEY (moduloId) REFERENCES Modulo (id_modulo)
);

-- Tabla Contenido
CREATE TABLE Contenido (
    id_contenido SERIAL PRIMARY KEY,
    archivo VARCHAR(255) NOT NULL,
    url VARCHAR(255),
    tipo_contenido VARCHAR(50) NOT NULL,
    leccionId INT NOT NULL,
    CONSTRAINT fk_contenido_leccion FOREIGN KEY (leccionId) REFERENCES LeccionCurso (id_leccion)
);

-- Tabla Usuario
CREATE TABLE Usuario (
    rut VARCHAR(20) PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    apellido_paterno VARCHAR(255) NOT NULL,
    apellido_materno VARCHAR(255),
    correo VARCHAR(255) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    rolId INT NOT NULL,
    areaId_area INT,
    activo BOOLEAN DEFAULT TRUE NOT NULL,
    CONSTRAINT fk_usuario_rol FOREIGN KEY (rolId) REFERENCES Rol (id_rol),
    CONSTRAINT fk_usuario_area FOREIGN KEY (areaId_area) REFERENCES Area (id_area)
);

-- Tabla CursoAsignado
CREATE TABLE CursoAsignado (
    fecha_asignacion TIMESTAMP NOT NULL,
    fecha_acceso TIMESTAMP NOT NULL,
    cursoId INT NOT NULL,
    usuarioId VARCHAR(20) NOT NULL,
    PRIMARY KEY (cursoId, usuarioId),
    CONSTRAINT fk_cursoAsignado_curso FOREIGN KEY (cursoId) REFERENCES CursoCapacitacion (id_curso),
    CONSTRAINT fk_cursoAsignado_usuario FOREIGN KEY (usuarioId) REFERENCES Usuario (rut)
);

-- Tabla Cumplimiento_leccion
CREATE TABLE Cumplimiento_leccion (
    usuarioId VARCHAR(20) NOT NULL,
    leccionId INT NOT NULL,
    fecha_modificacion_estado TIMESTAMP,
    estado BOOLEAN NOT NULL,
    PRIMARY KEY (usuarioId, leccionId),
    CONSTRAINT fk_cumplimiento_usuario FOREIGN KEY (usuarioId) REFERENCES Usuario (rut),
    CONSTRAINT fk_cumplimiento_leccion FOREIGN KEY (leccionId) REFERENCES LeccionCurso (id_leccion)
);

-- Tabla Area
CREATE TABLE Area (
    id_area SERIAL PRIMARY KEY,
    nombre_area VARCHAR(255) NOT NULL
);

-- Tabla Rol
CREATE TABLE Rol (
    id_rol SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(255) NOT NULL
);

-- Tabla Encuesta
CREATE TABLE Encuesta (
    id_encuesta SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    fecha_creacion TIMESTAMP NOT NULL,
    estado_encuesta VARCHAR(50) NOT NULL
);

-- Tabla EncuestaAsignada
CREATE TABLE EncuestaAsignada (
    id_asignacion SERIAL PRIMARY KEY,
    estado VARCHAR(50) NOT NULL,
    fecha_asignacion TIMESTAMP NOT NULL,
    encuestaId INT NOT NULL,
    usuarioId VARCHAR(20) NOT NULL,
    CONSTRAINT fk_encuestaAsignada_encuesta FOREIGN KEY (encuestaId) REFERENCES Encuesta (id_encuesta),
    CONSTRAINT fk_encuestaAsignada_usuario FOREIGN KEY (usuarioId) REFERENCES Usuario (rut)
);

-- Tabla Pregunta
CREATE TABLE Pregunta (
    id_pregunta SERIAL PRIMARY KEY,
    texto_pregunta TEXT NOT NULL,
    tipo_respuesta VARCHAR(50) NOT NULL,
    encuestaId INT NOT NULL,
    CONSTRAINT fk_pregunta_encuesta FOREIGN KEY (encuestaId) REFERENCES Encuesta (id_encuesta)
);

-- Tabla OpcionRespuesta
CREATE TABLE OpcionRespuesta (
    id_opcion SERIAL PRIMARY KEY,
    texto_opcion TEXT NOT NULL,
    preguntaId INT NOT NULL,
    CONSTRAINT fk_opcion_pregunta FOREIGN KEY (preguntaId) REFERENCES Pregunta (id_pregunta)
);

-- Tabla Respuesta
CREATE TABLE Respuesta (
    id_respuesta SERIAL PRIMARY KEY,
    texto_respuesta TEXT,
    fecha_respuesta TIMESTAMP NOT NULL,
    usuarioId VARCHAR(20) NOT NULL,
    opcionId INT,
    preguntaId_pregunta INT,
    CONSTRAINT fk_respuesta_usuario FOREIGN KEY (usuarioId) REFERENCES Usuario (rut),
    CONSTRAINT fk_respuesta_opcion FOREIGN KEY (opcionId) REFERENCES OpcionRespuesta (id_opcion),
    CONSTRAINT fk_respuesta_pregunta FOREIGN KEY (preguntaId_pregunta) REFERENCES Pregunta (id_pregunta),
    UNIQUE (usuarioId, preguntaId_pregunta)
);
