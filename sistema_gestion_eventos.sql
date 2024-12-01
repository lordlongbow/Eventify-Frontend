-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-12-2024 a las 15:43:12
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sistema_gestion_eventos`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `ConfirmarAsistencia` (IN `id_evento` INT, IN `id_asistente` INT, IN `id_organizador` INT)   BEGIN
    -- Declarar la variable para almacenar el estado actual de confirmación
    DECLARE confirmacion_actual TINYINT;

    -- Verificar si el usuario es el organizador del evento
    IF (SELECT evento.idOrganizador 
        FROM evento 
        WHERE evento.idEvento = id_evento) = id_organizador THEN
        
        -- Obtener el estado actual de confirmación
        SELECT confirmacion 
        INTO confirmacion_actual
        FROM participacion
        WHERE idEvento = id_evento AND idAsistente = id_asistente;

        -- Alternar el estado de confirmación
        IF confirmacion_actual = 1 THEN
            UPDATE participacion 
            SET confirmacion = 0
            WHERE idEvento = id_evento AND idAsistente = id_asistente;
        ELSE
            UPDATE participacion 
            SET confirmacion = 1
            WHERE idEvento = id_evento AND idAsistente = id_asistente;
        END IF;

    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ListarAsistentesConfirmados` (`id_evento` INT)   BEGIN
  
    SELECT asistente.nombre, asistente.email 
    FROM participacion
    JOIN asistentes ON participacion.idAsistente = asistente.idAsistente 
    WHERE participacion.idEvento = id_evento AND participacion.confirmado = TRUE;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ListarEventos` ()   BEGIN
  SELECT * FROM evento ORDER BY evento.fecha ASC;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ObtenerMiPerfil` (IN `idAsistente` INT)   BEGIN
    SELECT 
        asistente.nombre, 
        asistente.domicilio, 
        asistente.email, 
        asistente.username, 
        asistente.fotoRuta
    FROM asistente
    WHERE asistente.idAsistente = idAsistente;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `ObtenerPerfil` (IN `idAsistente` INT)   BEGIN
    SELECT 
        asistente.nombre, 
        asistente.domicilio, 
        asistente.email, 
        asistente.username, 
        asistente.fotoRuta
    FROM asistente
    WHERE asistente.idAsistente = idAsistente;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `VerDetallesEvento` (`id` INT)   BEGIN
  -- aca me surge la duda si es mas eficiente utilizar * o listar los atributos en la consulta
  SELECT * FROM evento WHERE evento.idEvento = id;
END$$

--
-- Funciones
--
CREATE DEFINER=`root`@`localhost` FUNCTION `ActualizarEvento` (`id_evento` INT, `nombre` VARCHAR(50), `fecha` DATE, `ubicacion` VARCHAR(50), `descripcion` VARCHAR(50), `id_asistente` INT) RETURNS VARCHAR(255) CHARSET utf8mb4 COLLATE utf8mb4_general_ci  BEGIN
  DECLARE mensaje VARCHAR(255);
  
  -- aca busco cual es el organizador del evento y si es el asistente (usuario) que hizo el evento
  IF (SELECT evento.idOrganizador FROM evento WHERE evento.idEvento = id_evento) = id_asistente THEN
 -- una vez que se encuentra el organizador, "entonces" actualiza.
    UPDATE evento
    SET evento.nombre = nombre,
        evento.fecha = fecha,
        evento.ubicacion = ubicacion,
        evento.descripcion = descripcion
    WHERE evento.idEvento = id_evento;
    
    SET mensaje = 'Evento actualizado correctamente';
  ELSE
    -- Si no es el organizador, no permite la actualización y muestra el mensaje desde la variable de arriba
    SET mensaje = 'Error: El asistente no es el organizador del evento';
  END IF;
  -- y retorna el mesaje correspondiente
  RETURN mensaje;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `AltaEvento` (`nombre` VARCHAR(50), `fecha` DATE, `ubicacion` VARCHAR(50), `descripcion` TEXT, `id_organizador` INT) RETURNS VARCHAR(50) CHARSET utf8mb4 COLLATE utf8mb4_general_ci  BEGIN
  
  INSERT INTO evento (nombre, fecha, ubicacion, descripcion, idOrganizador)  
  VALUES (nombre, fecha, ubicacion, descripcion, id_organizador);
  
  RETURN 'Evento registrado';
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `EliminarEvento` (`id_evento` INT, `id_asistente` INT) RETURNS VARCHAR(255) CHARSET utf8mb4 COLLATE utf8mb4_general_ci  BEGIN
  DECLARE mensaje VARCHAR(255);
  
  -- mismo sistema para buscar al usuaario
  IF (SELECT evento.idOrganizador FROM evento WHERE evento.idEvento = id_evento) = id_asistente THEN
 -- una vez que se encuentra el organizador, "entonces" borra.
    DELETE FROM evento WHERE evento.idEvento = id_evento;
    
    SET mensaje = 'Evento borrado correctamente';
  ELSE
    -- Si no es el organizador, no permite la actualización y muestra el mensaje desde la variable de arriba
    SET mensaje = 'Error: El asistente no es el organizador del evento';
  END IF;
  -- y retorna el mesaje correspondiente otra vez
  RETURN mensaje;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `RegistrarAsistencia` (`id_evento` INT, `id_asistente` INT) RETURNS VARCHAR(255) CHARSET latin1 COLLATE latin1_swedish_ci  BEGIN
  DECLARE mensaje VARCHAR(255);

  INSERT INTO participacion(idEvento, idAsistente, confirmacion) 
  VALUES (id_evento, id_asistente, 0);
-- el estado estara en false, ya que el asistente se incribe y llena la tabla y el organizador cambiara la confirmacion a true el dia del evento.
  SET mensaje= 'Usuario registrado para el evento.';
  RETURN mensaje;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistente`
--

CREATE TABLE `asistente` (
  `idAsistente` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `domicilio` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `estado` tinyint(4) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fotoRuta` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `asistente`
--

INSERT INTO `asistente` (`idAsistente`, `nombre`, `domicilio`, `email`, `estado`, `username`, `password`, `fotoRuta`) VALUES
(1, 'Diego Orellano', 'Riadavia', 'Diegos@ejemplo.com', 0, 'diego', '$2b$10$tD17nDVj1CaAnDMBADAJCeg7w9I9XweuPng1Q/PgQjq9PwreEPR.K', 'images/default-avatar.jpg'),
(2, ' Daenerys Targaryen', 'Dragonstone, Westeros', 'khaleesi.dragon@westeros.com', 0, 'khaleesiFire', '$2b$10$/syXGljzcc/scPHW/p97KufW/i6eoGzUrl8gx1ihjjQXaxIgONZBi', 'images/default-avatar.jpg'),
(3, 'Diego s Orellano', 'mi casa', 'Diegoss@ejemplo.com', 0, 'diegoso', '$2b$10$FZQzU6FX3LUT84kJpIct1uB0jJorURRMxRT8eXuu13IFIzesUq4ZK', NULL),
(4, ' Peter Parker', ' Queens, Nueva York', 'peter@dailybugle.com', 0, 'spiderman', '$2b$10$ztu6d6N/LSinOxTcWp0AgeALA.f.plnsJgkr0eADQ/K2OFTQhExly', NULL),
(5, ' Carl Friedrich Gauss', ' Brunswick, Alemania', 'gauss@math.org', 0, 'carl_gauss', '$2b$10$ZC.JtD./1zIGPx4vhDIEH.vY9f6kxpNB0DJPR/j9T0RGOo2ZljaMO', NULL),
(6, 'Sheldon Cooper', 'Pasadena, California', 'sheldon@caltech.edu', 0, 'sheldon_cooper', '$2b$10$HWZWlOEgEjPIZD4GxGxt/.ic57fOH0Mlt/LhruIOa9Ux8Evgzi0PG', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evento`
--

CREATE TABLE `evento` (
  `idEvento` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `fecha` date NOT NULL,
  `ubicacion` varchar(150) NOT NULL,
  `descripcion` varchar(250) NOT NULL,
  `fotoRuta` varchar(255) NOT NULL,
  `idOrganizador` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `evento`
--

INSERT INTO `evento` (`idEvento`, `nombre`, `fecha`, `ubicacion`, `descripcion`, `fotoRuta`, `idOrganizador`) VALUES
(1, 'Vibra de la Calle!!!', '2024-12-14', 'Estadio Nacional, Ciudad de México', 'Un concierto imperdible para los amantes del rock, con las mejores bandas locales y un ambiente lleno de energía. ¡Ven a cantar y disfrutar con amigos!', '/images/eventoimages/1732143506416-rock.jpg', 1),
(2, 'Sabores del Mundo', '2024-11-29', 'Parque Central, Santiago Del Estero', 'Participa en nuestra maratón anual para promover un estilo de vida saludable! Un evento para todas las edades, con actividades para toda la familia.', '/images/eventoimages/1732143606420-buenosairesmarket.jpg', 1),
(3, 'Colores y Formas', '2024-11-29', 'Museo de Arte Contemporaneo, Buenos Aires', 'Ven a disfrutar de una exposición única que muestra las últimas tendencias en arte moderno. Obras que desafían la percepción y la creatividad.', '/images/eventoimages/1732143700739-imagesfd.jpg', 1),
(4, 'Corre por la Salud', '2024-12-27', 'Plaza San Martin, Villa Eloisa', '¡Participa en nuestra maratón anual para promover un estilo de vida saludable! Un evento para todas las edades, con actividades para toda la familia.', '/images/eventoimages/1732143811171-imagesmaraton.jpg', 1),
(5, 'La Conquista de Westeros: Torneo de Combate', '2025-06-26', 'Una arena o campo al aire libre decorado al estilo medieval.', 'Un torneo medieval donde los asistentes pueden competir en varias disciplinas, como lucha medieval, tiro con arco y justas. Daenerys podría organizar un combate de estilo \"tiranos vs. rebeldes\", con medallas y premios a los mejores guerreros.', '/images/eventoimages/1732144176451-imagesmd.jpg', 2),
(6, 'El Banquete de la Realeza', '2025-06-28', 'Salon Comedor, La Fortaleza Roja', 'Un evento de alto nivel donde los asistentes disfrutan de una cena de estilo medieval, con platos tradicionales de Westeros. El evento incluiría charlas sobre liderazgo y el arte de gobernar, y sería ideal para una conferencia', '/images/eventoimages/1732144382658-imagesgsg.jpg', 2),
(10, 'Evento de otro', '2024-11-29', 'Aca', 'otro  evento', '/images/eventoimages/1732756799693-Captura de pantalla (3).png', 3),
(11, 'Concierto de Rock: La Banda The Ex', '2024-12-18', ' Arena Music Hall, Av. Libertador', '¡No te pierdas el concierto en vivo de La Banda X! Una noche llena de buena música y energía. Compra tus entradas ahora.', '/images/eventoimages/1733000549854-photo-1722841549528-7298bea73c3c.jpg', 1),
(12, ' Jornada de Vacunación Contra la Gripe', '2024-12-12', 'Centro de Salud, Av. San Martín 300', 'Ven a vacunarte contra la gripe en este evento organizado por el Ministerio de Salud. ¡La salud es lo más importante!', '/images/eventoimages/1733000845977-WhatsApp-Image-2023-04-26-at-10.35.20-800x400.jpeg', 1),
(13, ' Conferencia sobre Inteligencia Artificial', '2024-11-30', 'Centro de Convenciones, Sala A', 'Descubre las últimas tendencias en inteligencia artificial de la mano de expertos en el área. ¡No te lo puedes perder!', '/images/eventoimages/1733007327664-sethsehtsre.jpg', NULL),
(14, 'Conferencia de Teoria de Cuerdas', '2024-11-30', 'Centro de Convenciones, Sala C', 'Descubre el fantastico mundo de la realidad en la fisica teorica!!', '/images/eventoimages/1733007498696-teoria-de-cuerdas.webp', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `participacion`
--

CREATE TABLE `participacion` (
  `idParticipacion` int(11) NOT NULL,
  `idAsistente` int(11) NOT NULL,
  `idEvento` int(11) NOT NULL,
  `confirmacion` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `participacion`
--

INSERT INTO `participacion` (`idParticipacion`, `idAsistente`, `idEvento`, `confirmacion`) VALUES
(4, 1, 6, 0),
(5, 3, 1, 1),
(6, 3, 6, 0),
(7, 3, 1, 0),
(8, 3, 5, 0),
(9, 1, 10, 1),
(10, 1, 10, 0),
(11, 4, 1, 0),
(13, 4, 4, 0),
(14, 4, 2, 0),
(15, 5, 2, 0),
(16, 5, 12, 0),
(17, 5, 5, 0),
(18, 6, 2, 0),
(19, 6, 1, 0),
(20, 6, 5, 0),
(21, 3, 2, 0),
(22, 3, 6, 0),
(23, 1, 5, 0),
(24, 1, 6, 0),
(25, 1, 13, 0),
(26, 1, 14, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asistente`
--
ALTER TABLE `asistente`
  ADD PRIMARY KEY (`idAsistente`);

--
-- Indices de la tabla `evento`
--
ALTER TABLE `evento`
  ADD PRIMARY KEY (`idEvento`),
  ADD KEY `idOrganizador` (`idOrganizador`);

--
-- Indices de la tabla `participacion`
--
ALTER TABLE `participacion`
  ADD PRIMARY KEY (`idParticipacion`),
  ADD KEY `idAsistente` (`idAsistente`),
  ADD KEY `idEvento` (`idEvento`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asistente`
--
ALTER TABLE `asistente`
  MODIFY `idAsistente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `evento`
--
ALTER TABLE `evento`
  MODIFY `idEvento` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `participacion`
--
ALTER TABLE `participacion`
  MODIFY `idParticipacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `evento`
--
ALTER TABLE `evento`
  ADD CONSTRAINT `idOrganizador` FOREIGN KEY (`idOrganizador`) REFERENCES `asistente` (`idAsistente`);

--
-- Filtros para la tabla `participacion`
--
ALTER TABLE `participacion`
  ADD CONSTRAINT `idAsistente` FOREIGN KEY (`idAsistente`) REFERENCES `asistente` (`idAsistente`),
  ADD CONSTRAINT `idEvento` FOREIGN KEY (`idEvento`) REFERENCES `evento` (`idEvento`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
