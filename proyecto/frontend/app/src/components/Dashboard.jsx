import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, BarChart2, User } from 'lucide-react'

const Dashboard = () => {
  const [encuestas, setEncuestas] = useState([]);
  const [selectedEncuesta, setSelectedEncuesta] = useState(null);
  const [detallesEncuesta, setDetallesEncuesta] = useState(null);
  const [totalAsignadas, setTotalAsignadas] = useState(0);
  const [totalRespondidas, setTotalRespondidas] = useState(0);
  const [detallesUsuario, setDetallesUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleVerEstadisticas = (encuestaId) => {
    navigate(`/estadisticas-encuesta/${encuestaId}`);
  };

  useEffect(() => {
    const fetchEncuestas = async () => {
      const token = localStorage.getItem('token');
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:4000/api/encuestas', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEncuestas(response.data);
        setError(null);
      } catch (error) {
        console.error('Error al obtener encuestas:', error);
        setError('Error al obtener encuestas. Por favor, intente de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchEncuestas();
  }, []);

  const handleEncuestaSelect = async (encuestaId) => {
    const token = localStorage.getItem('token');
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:4000/api/encuestas/${encuestaId}/detalles`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDetallesEncuesta(response.data);
      setSelectedEncuesta(encuestaId);
      calcularPorcentajes(response.data);
      setError(null);
    } catch (error) {
      console.error('Error al obtener detalles de la encuesta:', error);
      setError('Error al obtener detalles de la encuesta. Por favor, intente de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const calcularPorcentajes = (encuestaDetalles) => {
    if (!encuestaDetalles || !encuestaDetalles.preguntas.length) {
      setTotalAsignadas(0);
      setTotalRespondidas(0);
      return;
    }

    const usuariosAsignados = new Set(
      encuestaDetalles.preguntas.flatMap((pregunta) =>
        pregunta.respuestas.map((respuesta) => respuesta.usuario.rut)
      )
    );

    const usuariosQueRespondieron = new Set();
    usuariosAsignados.forEach((rut) => {
      const respondioTodo = encuestaDetalles.preguntas.every((pregunta) =>
        pregunta.respuestas.some(
          (respuesta) =>
            respuesta.usuario.rut === rut &&
            (respuesta.texto_respuesta || respuesta.opcion)
        )
      );
      if (respondioTodo) {
        usuariosQueRespondieron.add(rut);
      }
    });

    setTotalAsignadas(usuariosAsignados.size);
    setTotalRespondidas(usuariosQueRespondieron.size);
  };

  const handleVerDetallesUsuario = (rut) => {
    const usuarioRespuestas = detallesEncuesta.preguntas.map((pregunta) => {
      const respuesta = pregunta.respuestas.find(
        (resp) => resp.usuario.rut === rut
      );
      return {
        pregunta: pregunta.texto_pregunta,
        respuesta: respuesta
          ? respuesta.texto_respuesta || respuesta.opcion?.texto_opcion
          : 'Sin respuesta',
      };
    });
    setDetallesUsuario({ rut, respuestas: usuarioRespuestas });
  };

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
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Dashboard de Encuestas</h2>
      <Card>
        <CardHeader>
          <CardTitle>Selecciona una Encuesta</CardTitle>
          <CardDescription>Elige una encuesta para ver sus detalles y estadísticas</CardDescription>
        </CardHeader>
        <CardContent>
          <Select onValueChange={handleEncuestaSelect}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccione una encuesta" />
            </SelectTrigger>
            <SelectContent>
              {encuestas.map((encuesta) => (
                <SelectItem key={encuesta.id_encuesta} value={encuesta.id_encuesta.toString()}>
                  {encuesta.titulo}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {detallesEncuesta && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>{detallesEncuesta.titulo}</CardTitle>
            <CardDescription>Detalles y estadísticas de la encuesta seleccionada</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2">Porcentaje de encuestas respondidas</h4>
              <Progress value={(totalRespondidas / totalAsignadas) * 100} className="w-full" />
              <p className="mt-2 text-sm text-muted-foreground">
                {totalRespondidas} de {totalAsignadas} ({((totalRespondidas / totalAsignadas) * 100).toFixed(1)}%)
              </p>
            </div>
            <Button onClick={() => handleVerEstadisticas(selectedEncuesta)} className="mb-6">
              <BarChart2 className="mr-2 h-4 w-4" /> Ver Estadísticas
            </Button>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>RUT del Usuario</TableHead>
                  <TableHead>Nombre del Usuario</TableHead>
                  <TableHead>Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {detallesEncuesta.preguntas[0]?.respuestas.map((_, index) => {
                  const usuario = detallesEncuesta.preguntas[0].respuestas[index].usuario;
                  return (
                    <TableRow key={usuario.rut}>
                      <TableCell>{usuario.rut}</TableCell>
                      <TableCell>{`${usuario.nombre} ${usuario.apellido_paterno} ${usuario.apellido_materno}`}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => handleVerDetallesUsuario(usuario.rut)}>
                          <User className="mr-2 h-4 w-4" /> Ver Detalles
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {detallesUsuario && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Detalles de Respuestas</CardTitle>
            <CardDescription>Usuario: {detallesUsuario.rut}</CardDescription>
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
                {detallesUsuario.respuestas.map((detalle, index) => (
                  <TableRow key={index}>
                    <TableCell>{detalle.pregunta}</TableCell>
                    <TableCell>{detalle.respuesta}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Button variant="outline" onClick={() => setDetallesUsuario(null)}>Cerrar</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;