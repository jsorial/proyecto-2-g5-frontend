// Importaciones de librerías y componentes
import React, { useEffect, useState } from "react"; // Asegúrate de incluir React, useEffect y useState
import { Link, useNavigate } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa"; // Importamos el ícono que usaremos

const HUVISUALLIZARINICIOSEGN = () => {
  const apiUrlUSERNAME = import.meta.env.VITE_APP_API_URL_USERNAME;
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState({
    empleados: false,
    t_productos: false,
    productos: false,
    clientes: false,
    t_ejercicios: false,
    otro: false,
  }); // Estado de carga para cada botón

  const params = new URLSearchParams(window.location.search);
  console.log("Todos los parámetros:", window.location.search); // Verificar que todos los parámetros están presentes
  
  const role = params.get("role");
  const token = params.get("token");
  const username = params.get("username");
  console.log("role recibido en Visualizar inicio admin:", role);
  console.log("token recibido en Visualizar inicio admin:", token);
  console.log("username recibido en Visualizar inicio admin:", username);

  

  useEffect(() => {
    if (token && username) {
      console.log("Datos recibidos:", { role, token, username });
      fetchUserName();
    }
  }, [role, token, username]); // Dependencias del useEffect // Dependencia de `navigate` // Dependencia de `token` y `username` para volver a ejecutar si estos cambian

  const fetchUserName = async () => {
    try {
      const response = await fetch(`${apiUrlUSERNAME}?username=${username}`);

      if (!response.ok) {
        throw new Error("Error en la respuesta de la API");
      }

      const data = await response.json();
      console.log("Respuesta de la API:", data);

      if (Array.isArray(data)) {
        if (data.length > 0) {
          setUser(data[0]);
        } else {
          console.error("El array está vacío");
          setUser({});
        }
      } else if (data && typeof data === "object") {
        setUser(data);
      } else {
        console.error("Formato inesperado en la respuesta de la API:", data);
        setUser({});
      }
    } catch (error) {
      console.error("Error al obtener la información del usuario", error);
    }
  };

  const handleNavigation = async (path, type) => {
    setLoading((prev) => ({ ...prev, [type]: true })); // Cambia el estado a carga para el botón específico
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simula un tiempo de carga

    // Asegúrate de que la navegación incluya los parámetros necesarios
    //const newPath = `${path}?role=${role}&token=${token}&username=${username}`;

    navigate(path); // Navega a la nueva ruta
    setLoading((prev) => ({ ...prev, [type]: false })); // Restablece el estado de carga
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-end p-10 relative">
      <img
        src="/assets/fondo.png"
        alt="Imagen de fondo"
        className="absolute left-0 bottom-0 w-full h-full object-cover z-0"
      />

      <div className="w-full max-w-4xl relative z-10">
        <h1 className="text-4xl font-bold mb-12 text-red-600 text-center">
          Bienvenido Admin
        </h1>
        {/*<div>
          <h1>Datos recibidos: role: {role} token: {token} username: {username} </h1>
        </div>*/}

        <div className="grid grid-cols-2 gap-0">
          <div className="text-left">
            <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-b-lg max-w-xs mx-auto">
              <button
                className="bg-white text-gray-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center"
                onClick={() => handleNavigation(`/?role=${role}&token=${token}&username=${username}`, "empleados")}
                disabled={loading.empleados}
              >
                <div className="text-left">
                  <h3 className="text-lg">Administrar</h3>
                  <h1 className="text-3xl">EMPLEADOS</h1>
                </div>
                <FaChevronRight className="text-red-600 text-3xl" />{" "}
                {/* Ícono de flecha */}
                {loading.empleados && (
                  <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6 mt-2"></div>
                )}
              </button>
              <button
                className="bg-white text-gray-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center"
                onClick={() =>
                  handleNavigation(`/Lista_Tipo_Productos?role=${role}&token=${token}&username=${username}`, "t_productos")
                }
                disabled={loading.t_productos}
              >
                <div className="text-left">
                  <h3 className="text-lg">Administrar</h3>
                  <h1 className="text-3xl">T.PRODUCTOS</h1>
                </div>
                <FaChevronRight className="text-red-600 text-3xl" />
                {loading.t_productos && (
                  <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6 mt-2"></div>
                )}
              </button>
              <button
                className="bg-white text-gray-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center"
                onClick={() =>
                  handleNavigation(`/Lista_Productos?role=${role}&token=${token}&username=${username}`, "productos")
                }
                disabled={loading.productos}
              >
                <div className="text-left">
                  <h3 className="text-lg">Administrar</h3>
                  <h1 className="text-3xl">PRODUCTOS</h1>
                </div>
                <FaChevronRight className="text-red-600 text-3xl" />
                {loading.productos && (
                  <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6 mt-2"></div>
                )}
              </button>
            </div>
          </div>

          <div className="text-left">
            <div className="flex flex-col gap-4 bg-gray-100 p-4 rounded-b-lg max-w-xs mx-auto">
              <button
                className="bg-white text-gray-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center"
                onClick={() => handleNavigation(`/?role=${role}&token=${token}&username=${username}`, "clientes")}
                disabled={loading.clientes}
              >
                <div className="text-left">
                  <h3 className="text-lg">Administrar</h3>
                  <h1 className="text-3xl">CLIENTES</h1>
                </div>
                <FaChevronRight className="text-red-600 text-3xl" />
                {loading.clientes && (
                  <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6 mt-2"></div>
                )}
              </button>
              <button
                className="bg-white text-gray-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center"
                onClick={() => handleNavigation(`/tejercicios?role=${role}&token=${token}&username=${username}`, "t_ejercicios")}
                disabled={loading.t_ejercicios}
              >
                <div className="text-left">
                  <h3 className="text-lg">Administrar</h3>
                  <h1 className="text-3xl">T.EJERCICIOS</h1>
                </div>
                <FaChevronRight className="text-red-600 text-3xl" />
                {loading.t_ejercicios && (
                  <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6 mt-2"></div>
                )}
              </button>
              <button
                to={"/"}
                className="bg-white text-gray-600 border border-white-600 font-semibold py-2 px-4 rounded-lg flex justify-between items-center"
                onClick={() => handleNavigation(`/?role=${role}&token=${token}&username=${username}`, "otro")}
                disabled={loading.otro}
              >
                <div className="text-left">
                  <h3 className="text-lg">Administrar</h3>
                  <h1 className="text-3xl">OTRO</h1>
                </div>
                <FaChevronRight className="text-red-600 text-3xl" />
                {loading.otro && (
                  <div className="animate-spin border-2 border-red-600 border-t-transparent rounded-full h-6 w-6 mt-2"></div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HUVISUALLIZARINICIOSEGN;
