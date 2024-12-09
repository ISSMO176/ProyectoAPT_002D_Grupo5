import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Para navegación
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Loader2, BarChart2, ChevronLeft, ChevronRight } from "lucide-react";

const Dashboard = () => {
  const [encuestas, setEncuestas] = useState([]);
  const [selectedEncuesta, setSelectedEncuesta] = useState(null);
  const [detallesEncuesta, setDetallesEncuesta] = useState(null);
  const [detallesUsuario, setDetallesUsuario] = useState(null);
  const [totalAsignadas, setTotalAsignadas] = useState(0);
  const [totalRespondidas, setTotalRespondidas] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [usuariosPorPagina] = useState(5);
  const [respuestasPage, setRespuestasPage] = useState(1); 
  const [respuestasPorPagina] = useState(5); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchEncuestas = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:4000/api/encuestas");
        setEncuestas(response.data);
      } catch (error) {
        console.error("Error al obtener encuestas:", error);
        setError("Error al obtener encuestas.");
      } finally {
        setLoading(false);
      }
    };

    fetchEncuestas();
  }, []);

  const handleEncuestaSelect = async (encuestaId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:4000/api/encuestas/${encuestaId}/detalles`
      );
      setDetallesEncuesta(response.data);
      setSelectedEncuesta(encuestaId);

      const totalAsignadas = response.data.usuarios.length;
      const totalRespondidas = response.data.usuarios.filter(
        (usuario) => usuario.estado === "Respondida"
      ).length;

      setTotalAsignadas(totalAsignadas);
      setTotalRespondidas(totalRespondidas);
    } catch (error) {
      console.error("Error al obtener detalles de la encuesta:", error);
      setError("Error al obtener detalles de la encuesta.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerEstadisticas = () => {
    if (!selectedEncuesta || !detallesEncuesta) {
      console.error("No se ha seleccionado ninguna encuesta.");
      return;
    }

    navigate(`/estadisticas-encuesta/${selectedEncuesta}`, {
      state: {
        titulo: detallesEncuesta.titulo,
        fechaCreacion: detallesEncuesta.fecha_creacion,
      },
    });
  };

  const handleVerDetallesUsuario = (usuario) => {
    if (!detallesEncuesta || !detallesEncuesta.preguntas) {
      console.error("No hay preguntas disponibles para esta encuesta.");
      return;
    }

    const respuestas = detallesEncuesta.preguntas.map((pregunta) => {
      const respuesta = pregunta.respuestas.find(
        (resp) => resp.rut_usuario === usuario.rut
      );

      return {
        pregunta: pregunta.texto_pregunta,
        respuesta: respuesta
          ? respuesta.texto_respuesta || respuesta.opcion || "Sin respuesta"
          : "Sin respuesta",
      };
    });

    setDetallesUsuario({ usuario, respuestas });
    setRespuestasPage(1); // Reiniciar la paginación al ver un nuevo usuario
  };

  const closeDetallesUsuario = () => setDetallesUsuario(null);

  const calcularPorcentajeRespondidas = () => {
    if (totalAsignadas === 0) return 0;
    return ((totalRespondidas / totalAsignadas) * 100).toFixed(1);
  };

  const indexOfLastUsuario = currentPage * usuariosPorPagina;
  const indexOfFirstUsuario = indexOfLastUsuario - usuariosPorPagina;
  const currentUsuarios = detallesEncuesta
    ? detallesEncuesta.usuarios.slice(indexOfFirstUsuario, indexOfLastUsuario)
    : [];

  const paginateUsuarios = (pageNumber) => setCurrentPage(pageNumber);

  // Lógica de paginación para respuestas
  const indexOfLastRespuesta = respuestasPage * respuestasPorPagina;
  const indexOfFirstRespuesta = indexOfLastRespuesta - respuestasPorPagina;
  const currentRespuestas = detallesUsuario?.respuestas.slice(
    indexOfFirstRespuesta,
    indexOfLastRespuesta
  );

  const paginateRespuestas = (pageNumber) => setRespuestasPage(pageNumber);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="mr-2 h-16 w-16 animate-spin" />
        <span className="text-2xl">Cargando dashboard...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center mt-8">
        <h2 className="text-2xl font-bold">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Dashboard de Encuestas</h2>
      <Card>
        <CardHeader>
          <CardTitle>Selecciona una Encuesta</CardTitle>
        </CardHeader>
        <CardContent>
          <select
            onChange={(e) => handleEncuestaSelect(e.target.value)}
            className="w-full border rounded px-4 py-2"
          >
            <option value="">Seleccione una encuesta</option>
            {encuestas.map((encuesta) => (
              <option key={encuesta.id_encuesta} value={encuesta.id_encuesta}>
                {encuesta.titulo}
              </option>
            ))}
          </select>
        </CardContent>
      </Card>

      {detallesEncuesta && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>{detallesEncuesta.titulo}</CardTitle>
            <CardDescription>
              Detalles y estadísticas de la encuesta seleccionada
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end mb-4">
              <Button onClick={handleVerEstadisticas}>
                <BarChart2 className="mr-2 h-4 w-4" />
                Ver Estadísticas
              </Button>
            </div>
            <div className="mb-6">
              <Progress
                value={calcularPorcentajeRespondidas()}
                className="w-full"
              />
              <p className="mt-2">
                {totalRespondidas} de {totalAsignadas} respondidas (
                {calcularPorcentajeRespondidas()}%)
              </p>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>RUT</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentUsuarios.map((usuario) => (
                  <TableRow key={usuario.rut}>
                    <TableCell>{usuario.rut}</TableCell>
                    <TableCell>{usuario.nombre}</TableCell>
                    <TableCell>{usuario.estado}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleVerDetallesUsuario(usuario)}>
                        Ver Detalles
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {detallesUsuario && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Detalles de Respuestas</CardTitle>
            <CardDescription>Usuario: {detallesUsuario.usuario.nombre}</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pregunta</TableHead>
                  <TableHead>Respuesta</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentRespuestas.map((detalle, index) => (
                  <TableRow key={index}>
                    <TableCell>{detalle.pregunta}</TableCell>
                    <TableCell>{detalle.respuesta}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="flex justify-center mt-4">
              <Button
                variant="outline"
                onClick={() => paginateRespuestas(respuestasPage - 1)}
                disabled={respuestasPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({
                length: Math.ceil(
                  detallesUsuario.respuestas.length / respuestasPorPagina
                ),
              }).map((_, i) => (
                <Button
                  key={i}
                  variant={respuestasPage === i + 1 ? "default" : "outline"}
                  onClick={() => paginateRespuestas(i + 1)}
                >
                  {i + 1}
                </Button>
              ))}
              <Button
                variant="outline"
                onClick={() => paginateRespuestas(respuestasPage + 1)}
                disabled={
                  respuestasPage ===
                  Math.ceil(detallesUsuario.respuestas.length / respuestasPorPagina)
                }
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="mt-4">
              <Button onClick={closeDetallesUsuario}>Cerrar</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;
