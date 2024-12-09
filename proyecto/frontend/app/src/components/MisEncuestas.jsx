import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Search, Loader2, ChevronLeft, ChevronRight, ClipboardList, Calendar } from 'lucide-react';

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { showAlert } from "../lib/sweetalAlert";

const MisEncuestas = () => {
    const [encuestas, setEncuestas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [encuestasPorPagina] = useState(6);

    useEffect(() => {
        const fetchEncuestasPendientes = async () => {
            const token = localStorage.getItem('token');
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:4000/api/encuestasAsignada/misEncuestas', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setEncuestas(response.data);
                setError(null);
            } catch (error) {
                console.error('Error al obtener encuestas:', error);
                await showAlert('Error', 'Error al obtener encuestas asignadas. Por favor, intente de nuevo más tarde.', 'error');
            } finally {
                setLoading(false);
            }
        };
        fetchEncuestasPendientes();
    }, []);
    const filteredEncuestas = encuestas.filter(encuesta => 
        encuesta.encuesta.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // Obtener encuestas actuales
    const indexOfLastEncuesta = currentPage * encuestasPorPagina;
    const indexOfFirstEncuesta = indexOfLastEncuesta - encuestasPorPagina;
    const currentEncuestas = filteredEncuestas.slice(indexOfFirstEncuesta, indexOfLastEncuesta);

    // Cambiar página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="mr-2 h-16 w-16 animate-spin" />
                <span className="text-2xl">Cargando encuestas...</span>
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
            <div className="container mx-auto px-4 py-12 bg-gray-50 min-h-screen">
                <h2 className="text-4xl font-bold text-center mb-12 text-black">Mis Encuestas Pendientes</h2>
                <div className="flex justify-between items-center mb-8">
                    <div className="relative w-full max-w-md mx-auto">
                        <Input
                            placeholder="Buscar encuestas..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full"
                        />
                            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                </div>
            {currentEncuestas.length === 0 && (
                <Card className="p-8 text-center">
                    <CardContent>
                        <div className="flex flex-col items-center">
                            <ClipboardList className="h-16 w-16 text-muted-foreground mb-4" />
                            <h3 className="text-2xl font-semibold mb-2">No hay encuestas pendientes</h3>
                            <p className="text-muted-foreground">
                                En este momento no tienes encuestas para responder. ¡Vuelve más tarde!
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
            {currentEncuestas.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {currentEncuestas.map((encuestaAsignada) => (
                        <Card
                            key={encuestaAsignada.id_asignacion}
                            className="flex flex-col justify-between h-full transition-all duration-300 hover:shadow-xl"
                        >
                            <CardHeader className="pb-2">
                                <CardTitle className="text-xl font-semibold">{encuestaAsignada.encuesta.titulo}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Badge variant="Info" className="mb-4">
                                    Pendiente
                                </Badge>
                                <p className="text-sm text-muted-foreground">
                                    Esta encuesta está esperando tu respuesta. ¡Tu opinión es importante!
                                </p>
                            </CardContent>
                            <CardFooter className="pt-4">
                                <Button asChild className="w-full">
                                    <Link to={`/responderEncuesta/${encuestaAsignada.encuestaId}`} className="flex items-center justify-center">
                                        <ClipboardList className="mr-2 h-4 w-4" />
                                        Responder Ahora
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}


            {filteredEncuestas.length > encuestasPorPagina && (
                <div className="flex justify-center mt-12">
                    <Button
                        variant="outline"
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="mr-2"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {Array.from({ length: Math.ceil(filteredEncuestas.length / encuestasPorPagina) }, (_, i) => (
                        <Button
                            key={i}
                            variant={currentPage === i + 1 ? "default" : "outline"}
                            onClick={() => paginate(i + 1)}
                            className="mx-1"
                        >
                            {i + 1}
                        </Button>
                    ))}
                    <Button
                        variant="outline"
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === Math.ceil(filteredEncuestas.length / encuestasPorPagina)}
                        className="ml-2"
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            )}
        </div>

    );
};

export default MisEncuestas;