import React, { useEffect, useState } from "react"; // Asegúrate de incluir React, useEffect y useState
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const apiUrlUSERNAME = import.meta.env.VITE_APP_API_URL_USERNAME;

    const location = useLocation(); // Obtener la ubicación actual
    const [user, setUser] = useState({});

    // Obtener los parámetros de búsqueda de la ubicación actual
    const params = new URLSearchParams(location.search);
    const role = params.get("role");
    const token = params.get("token");
    const username = params.get("username");
    console.log("role recibido en Navbar admin:", role);
    console.log("token recibido en Navbar admin:", token);
    console.log("username recibido en Navbar admin:", username);


    // Construir la URL con los parámetros
    const baseUrl = "/";
    const paramsString = `?role=${role}&token=${token}&username=${username}`;

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

      // Función para determinar qué imagen mostrar
    const getUserImage = () => {
        // Asumiendo que la imagen del usuario viene en user.imagen o user.photo
        // Ajusta el nombre de la propiedad según tu API
        if (user && (user.image_url)) {
            return user.image_url; // Retorna la imagen del usuario
        }
        return "/icono-user.png"; // Retorna la imagen predeterminada
    };

    return (
        <nav className="min-h-[10vh] flex justify-between p-2" style={{ backgroundColor: "#FFFFFF" }}>
            <Link to={baseUrl + paramsString}>
                <img src={"/logo-3.png"} alt="logo fia fit" className="w-[30vh] h-[10vh]" />
            </Link>
            <div className="flex flex-row items-center mr-4 gap-20">
                <Link to={baseUrl + paramsString}>
                    <h1 className="text-[20px] font-bold" style={{ color: "#4B4F57" }}>Inicio</h1>
                </Link>
                <img src={getUserImage()} 
                    alt="icono usuario" 
                    className="border border-white rounded-full w-[8vh] h-[6vh] object-cover" // Añadí object-cover para mejor visualización
                    onError={(e) => {
                        e.target.src = "/icono-user.png"; // Si hay error al cargar la imagen, usa la predeterminada
                    }} />           
             </div>
        </nav>
    );
}
