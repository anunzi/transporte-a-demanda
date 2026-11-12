/* ==========================================================================
   Plataforma Digital TAD — datos ficticios compartidos (window.TAD)

   Todo lo que muestran las pantallas sale de aquí. Para cambiar un dato,
   se cambia en este archivo y se actualiza en todas las pantallas.

   - El bloque entre DATOS-INICIO y DATOS-FIN es JSON puro: lo comprueba
     herramientas/datos.py (las cuentas tienen que cerrar).
   - Debajo están las funciones de consulta (TAD.reserva(), TAD.ruta()…)
     y de formato (TAD.fmt.euros()…).

   Día de la maqueta: martes 14/04/2026.
   - TAD.ahora (09:40): backoffice y app del conductor.
   - TAD.ahoraSeguimiento (10:08): seguimiento del viajero (web y app).
   Todos los nombres, DNI, teléfonos y matrículas son inventados.
   ========================================================================== */
(function () {
  "use strict";

  var DATOS = /*DATOS-INICIO*/{
  "meta": {
    "nombre": "Plataforma Digital TAD",
    "territorio": "Comarca de la Sierra Norte",
    "fecha": "2026-04-14",
    "diaSemana": "martes",
    "ahora": "09:40",
    "ahoraSeguimiento": "10:08",
    "reservaReferencia": "TAD-2026-04187",
    "aviso": "Datos ficticios para la maqueta."
  },
  "municipios": [
    {
      "id": "valdecerro",
      "nombre": "Valdecerro",
      "habitantes": 4800,
      "zona": "A",
      "cabecera": true,
      "servicios": ["Centro de salud", "Instituto", "Estación de autobuses", "Centro de día"]
    },
    {"id": "robledillo", "nombre": "Robledillo de la Sierra", "habitantes": 1350, "zona": "B"},
    {"id": "santa-olalla", "nombre": "Santa Olalla del Río", "habitantes": 980, "zona": "B"},
    {"id": "navalespino", "nombre": "Navalespino", "habitantes": 720, "zona": "B"},
    {"id": "fuentelviejo", "nombre": "Fuentelviejo", "habitantes": 540, "zona": "B"}
  ],
  "nucleos": [
    {"id": "valdecerro", "nombre": "Valdecerro", "municipio": "valdecerro", "coord": [40.9, -3.6], "habitantes": 4520},
    {"id": "el-chaparral", "nombre": "El Chaparral", "municipio": "valdecerro", "coord": [40.9165, -3.584], "habitantes": 280},
    {"id": "robledillo", "nombre": "Robledillo", "municipio": "robledillo", "coord": [40.9455, -3.642], "habitantes": 960},
    {"id": "la-dehesa", "nombre": "La Dehesa", "municipio": "robledillo", "coord": [40.959, -3.6235], "habitantes": 230},
    {"id": "puente-viejo", "nombre": "Puente Viejo", "municipio": "robledillo", "coord": [40.93, -3.6615], "habitantes": 160},
    {"id": "santa-olalla", "nombre": "Santa Olalla", "municipio": "santa-olalla", "coord": [40.87, -3.558], "habitantes": 760},
    {"id": "las-huertas", "nombre": "Las Huertas", "municipio": "santa-olalla", "coord": [40.8565, -3.577], "habitantes": 220},
    {"id": "navalespino", "nombre": "Navalespino", "municipio": "navalespino", "coord": [40.9355, -3.543], "habitantes": 470},
    {"id": "cerro-alto", "nombre": "Cerro Alto", "municipio": "navalespino", "coord": [40.956, -3.5285], "habitantes": 140},
    {"id": "la-majada", "nombre": "La Majada", "municipio": "navalespino", "coord": [40.924, -3.519], "habitantes": 110},
    {"id": "fuentelviejo", "nombre": "Fuentelviejo", "municipio": "fuentelviejo", "coord": [40.8645, -3.651], "habitantes": 430},
    {"id": "el-molino", "nombre": "El Molino", "municipio": "fuentelviejo", "coord": [40.8495, -3.6665], "habitantes": 110}
  ],
  "paradas": [
    {
      "id": "P01",
      "nombre": "Plaza Mayor (Valdecerro)",
      "nucleo": "valdecerro",
      "municipio": "valdecerro",
      "coord": [40.9006, -3.6008],
      "tipo": "fija",
      "zona": "A"
    },
    {
      "id": "P02",
      "nombre": "Centro de Salud (Valdecerro)",
      "nucleo": "valdecerro",
      "municipio": "valdecerro",
      "coord": [40.8984, -3.5952],
      "tipo": "fija",
      "zona": "A"
    },
    {
      "id": "P03",
      "nombre": "Instituto Sierra Norte",
      "nucleo": "valdecerro",
      "municipio": "valdecerro",
      "coord": [40.9037, -3.6058],
      "tipo": "fija",
      "zona": "A"
    },
    {
      "id": "P04",
      "nombre": "Estación de autobuses",
      "nucleo": "valdecerro",
      "municipio": "valdecerro",
      "coord": [40.8958, -3.6046],
      "tipo": "intercambiador",
      "zona": "A"
    },
    {
      "id": "P05",
      "nombre": "Centro de día (Valdecerro)",
      "nucleo": "valdecerro",
      "municipio": "valdecerro",
      "coord": [40.9019, -3.5968],
      "tipo": "fija",
      "zona": "A"
    },
    {
      "id": "P06",
      "nombre": "Polideportivo (Valdecerro)",
      "nucleo": "valdecerro",
      "municipio": "valdecerro",
      "coord": [40.9052, -3.5985],
      "tipo": "fija",
      "zona": "A"
    },
    {
      "id": "P07",
      "nombre": "El Chaparral",
      "nucleo": "el-chaparral",
      "municipio": "valdecerro",
      "coord": [40.9163, -3.5843],
      "tipo": "fija",
      "zona": "A"
    },
    {
      "id": "P08",
      "nombre": "Iglesia (Robledillo)",
      "nucleo": "robledillo",
      "municipio": "robledillo",
      "coord": [40.9453, -3.6417],
      "tipo": "fija",
      "zona": "B"
    },
    {"id": "P09", "nombre": "La Dehesa", "nucleo": "la-dehesa", "municipio": "robledillo", "coord": [40.9588, -3.6238], "tipo": "fija", "zona": "B"},
    {
      "id": "P10",
      "nombre": "Puente Viejo (virtual)",
      "nucleo": "puente-viejo",
      "municipio": "robledillo",
      "coord": [40.9302, -3.661],
      "tipo": "virtual",
      "zona": "B"
    },
    {
      "id": "P11",
      "nombre": "Consultorio (Santa Olalla)",
      "nucleo": "santa-olalla",
      "municipio": "santa-olalla",
      "coord": [40.8702, -3.5584],
      "tipo": "fija",
      "zona": "B"
    },
    {
      "id": "P12",
      "nombre": "Las Huertas",
      "nucleo": "las-huertas",
      "municipio": "santa-olalla",
      "coord": [40.8567, -3.5768],
      "tipo": "fija",
      "zona": "B"
    },
    {
      "id": "P13",
      "nombre": "Cruce de la CM-1004 (virtual)",
      "nucleo": "las-huertas",
      "municipio": "santa-olalla",
      "coord": [40.8618, -3.5672],
      "tipo": "virtual",
      "zona": "B"
    },
    {
      "id": "P14",
      "nombre": "Iglesia (Navalespino)",
      "nucleo": "navalespino",
      "municipio": "navalespino",
      "coord": [40.9353, -3.5433],
      "tipo": "fija",
      "zona": "B"
    },
    {"id": "P15", "nombre": "Cerro Alto", "nucleo": "cerro-alto", "municipio": "navalespino", "coord": [40.9558, -3.5288], "tipo": "fija", "zona": "B"},
    {
      "id": "P16",
      "nombre": "Cruce de La Majada (virtual)",
      "nucleo": "la-majada",
      "municipio": "navalespino",
      "coord": [40.9238, -3.5193],
      "tipo": "virtual",
      "zona": "B"
    },
    {
      "id": "P17",
      "nombre": "Plaza (Fuentelviejo)",
      "nucleo": "fuentelviejo",
      "municipio": "fuentelviejo",
      "coord": [40.8647, -3.6507],
      "tipo": "fija",
      "zona": "B"
    },
    {
      "id": "P18",
      "nombre": "El Molino (virtual)",
      "nucleo": "el-molino",
      "municipio": "fuentelviejo",
      "coord": [40.8497, -3.6662],
      "tipo": "virtual",
      "zona": "B"
    }
  ],
  "obras": {"nombre": "Obras en la CM-1004", "poligono": [[40.8578, -3.574], [40.8606, -3.5642], [40.8646, -3.5612], [40.8632, -3.5705]]},
  "vehiculos": [
    {
      "matricula": "4521 LKT",
      "modelo": "Mercedes Sprinter",
      "plazas": 16,
      "pmr": true,
      "accesibilidad": "Rampa",
      "estado": "En servicio",
      "km": 148320,
      "itv": "2026-09-18",
      "seguro": {"compania": "Mutua Comarcal", "poliza": "MC-0418-2291", "vence": "2026-11-30"},
      "ultimoMantenimiento": "2026-03-02",
      "consumo": 10.4,
      "kmHoy": 26,
      "posicion": [40.86731, -3.55985],
      "rutaHoy": "R2",
      "conductorHoy": "c1",
      "posicionSeguimiento": [40.92718, -3.54774],
      "velocidad": 46
    },
    {
      "matricula": "8830 MNP",
      "modelo": "Ford Transit",
      "plazas": 9,
      "pmr": false,
      "accesibilidad": null,
      "estado": "En servicio",
      "km": 96510,
      "itv": "2026-07-04",
      "seguro": {"compania": "Mutua Comarcal", "poliza": "MC-0418-2307", "vence": "2026-11-30"},
      "ultimoMantenimiento": "2026-02-11",
      "consumo": 8.9,
      "kmHoy": 0,
      "posicion": [40.8962, -3.6038],
      "ubicacion": "Base de la Estación de autobuses",
      "velocidad": 0
    },
    {
      "matricula": "1177 KJR",
      "modelo": "Renault Master",
      "plazas": 12,
      "pmr": true,
      "accesibilidad": "Elevador",
      "estado": "En servicio",
      "km": 172045,
      "itv": "2026-05-27",
      "seguro": {"compania": "Mutua Comarcal", "poliza": "MC-0418-2288", "vence": "2026-11-30"},
      "ultimoMantenimiento": "2026-03-20",
      "consumo": 9.8,
      "kmHoy": 16,
      "posicion": [40.9081, -3.59322],
      "rutaHoy": "R1",
      "conductorHoy": "c2",
      "velocidad": 52
    },
    {
      "matricula": "6604 LBC",
      "modelo": "Fiat Ducato",
      "plazas": 9,
      "pmr": false,
      "accesibilidad": null,
      "estado": "Mantenimiento",
      "km": 201330,
      "itv": "2026-06-12",
      "seguro": {"compania": "Mutua Comarcal", "poliza": "MC-0418-2295", "vence": "2026-11-30"},
      "ultimoMantenimiento": "2026-04-14",
      "consumo": 9.1,
      "kmHoy": 0,
      "nota": "Avería en el embrague detectada a las 06:40. En el taller de Valdecerro; vuelta prevista el 16/04.",
      "posicion": null,
      "ubicacion": "Taller de Valdecerro",
      "velocidad": 0
    },
    {
      "matricula": "2293 MFG",
      "modelo": "Mercedes Vito",
      "plazas": 8,
      "pmr": false,
      "accesibilidad": null,
      "estado": "En servicio",
      "km": 88760,
      "itv": "2027-01-15",
      "seguro": {"compania": "Mutua Comarcal", "poliza": "MC-0418-2312", "vence": "2026-11-30"},
      "ultimoMantenimiento": "2026-01-29",
      "consumo": 8.2,
      "kmHoy": 14,
      "posicion": [40.92515, -3.56699],
      "rutaHoy": "R4",
      "conductorHoy": "c4",
      "velocidad": 74
    },
    {
      "matricula": "9951 KZD",
      "modelo": "Iveco Daily",
      "plazas": 19,
      "pmr": true,
      "accesibilidad": "Rampa",
      "estado": "En servicio",
      "subestado": "Sustitución",
      "km": 63480,
      "itv": "2027-03-02",
      "seguro": {"compania": "Mutua Comarcal", "poliza": "MC-0418-2320", "vence": "2026-11-30"},
      "ultimoMantenimiento": "2026-03-26",
      "consumo": 11.6,
      "kmHoy": 28,
      "nota": "Sustituye hoy al 6604 LBC en la ruta R3.",
      "posicion": [40.89743, -3.58434],
      "rutaHoy": "R3",
      "conductorHoy": "c3",
      "velocidad": 61
    }
  ],
  "conductores": [
    {
      "id": "c1",
      "nombre": "Carmen Ortega",
      "turno": "Mañana",
      "vehiculoHoy": "4521 LKT",
      "telefono": "6XX XXX 214",
      "estado": "En ruta",
      "rutaHoy": "R2"
    },
    {
      "id": "c2",
      "nombre": "Luis Benavente",
      "turno": "Mañana",
      "vehiculoHoy": "1177 KJR",
      "telefono": "6XX XXX 377",
      "estado": "En ruta",
      "rutaHoy": "R1"
    },
    {
      "id": "c3",
      "nombre": "Fátima El Mansouri",
      "turno": "Mañana",
      "vehiculoHoy": "9951 KZD",
      "telefono": "6XX XXX 452",
      "estado": "En ruta",
      "rutaHoy": "R3"
    },
    {
      "id": "c4",
      "nombre": "Andrés Pacheco",
      "turno": "Mañana",
      "vehiculoHoy": "2293 MFG",
      "telefono": "6XX XXX 609",
      "estado": "En ruta",
      "rutaHoy": "R4"
    },
    {
      "id": "c5",
      "nombre": "Rosa Calleja",
      "turno": "Tarde",
      "vehiculoHoy": "9951 KZD",
      "telefono": "6XX XXX 781",
      "estado": "Descanso",
      "rutaHoy": "R3",
      "nota": "Entra a las 15:00 y releva a Fátima El Mansouri en la ruta R3."
    }
  ],
  "personal": [
    {"id": "op1", "nombre": "Marta Iglesias", "cargo": "Operadora del centro de control", "perfil": "operador", "iniciales": "MI"},
    {
      "id": "ad1",
      "nombre": "Beatriz Lozano",
      "cargo": "Concejala de Movilidad · Ayuntamiento de Valdecerro",
      "perfil": "administracion",
      "iniciales": "BL"
    }
  ],
  "usuarios": [
    {
      "id": "u01",
      "nombre": "Josefa Martín Ruiz",
      "edad": 78,
      "municipio": "navalespino",
      "nucleo": "navalespino",
      "perfil": "mayor",
      "canal": "teléfono",
      "dni": "00000014X",
      "telefono": "6XX XXX 123",
      "bonificacion": "mayor",
      "bonificacionPct": 50,
      "iniciales": "JM"
    },
    {
      "id": "u02",
      "nombre": "Iván Serrano Gil",
      "edad": 16,
      "municipio": "fuentelviejo",
      "nucleo": "fuentelviejo",
      "perfil": "estudiante",
      "canal": "app",
      "dni": "00000021B",
      "telefono": "6XX XXX 340",
      "bonificacion": "estudiante",
      "bonificacionPct": 40,
      "iniciales": "IS"
    },
    {
      "id": "u03",
      "nombre": "Tomás Sanz Herrero",
      "edad": 81,
      "municipio": "santa-olalla",
      "nucleo": "santa-olalla",
      "perfil": "mayor",
      "canal": "teléfono",
      "dni": "00000035K",
      "telefono": "6XX XXX 558",
      "bonificacion": "mayor",
      "bonificacionPct": 50,
      "iniciales": "TS"
    },
    {
      "id": "u04",
      "nombre": "Pilar Domínguez Lara",
      "edad": 74,
      "municipio": "santa-olalla",
      "nucleo": "santa-olalla",
      "perfil": "mayor",
      "canal": "WhatsApp",
      "dni": "00000042P",
      "telefono": "6XX XXX 612",
      "bonificacion": "mayor",
      "bonificacionPct": 50,
      "iniciales": "PD"
    },
    {
      "id": "u05",
      "nombre": "Ana Ruiz Calvo",
      "edad": 52,
      "municipio": "santa-olalla",
      "nucleo": "santa-olalla",
      "perfil": "PMR",
      "canal": "app",
      "dni": "00000057C",
      "telefono": "6XX XXX 701",
      "bonificacion": "PMR",
      "bonificacionPct": 50,
      "iniciales": "AR"
    },
    {
      "id": "u06",
      "nombre": "Manuel Ortiz Peña",
      "edad": 67,
      "municipio": "robledillo",
      "nucleo": "robledillo",
      "perfil": "PMR",
      "canal": "teléfono",
      "dni": "00000063M",
      "telefono": "6XX XXX 233",
      "bonificacion": "PMR",
      "bonificacionPct": 50,
      "iniciales": "MO"
    },
    {
      "id": "u07",
      "nombre": "Elena Navarro Gil",
      "edad": 39,
      "municipio": "valdecerro",
      "nucleo": "el-chaparral",
      "perfil": "general",
      "canal": "app",
      "dni": "00000078T",
      "telefono": "6XX XXX 890",
      "bonificacion": "familia numerosa",
      "bonificacionPct": 20,
      "iniciales": "EN"
    },
    {
      "id": "u08",
      "nombre": "Ramón Gil Esteban",
      "edad": 45,
      "municipio": "navalespino",
      "nucleo": "la-majada",
      "perfil": "general",
      "canal": "WhatsApp",
      "dni": "00000081R",
      "telefono": "6XX XXX 466",
      "bonificacion": null,
      "bonificacionPct": 0,
      "iniciales": "RG"
    },
    {
      "id": "u09",
      "nombre": "Sara Molina Ríos",
      "edad": 15,
      "municipio": "robledillo",
      "nucleo": "la-dehesa",
      "perfil": "estudiante",
      "canal": "app",
      "dni": "00000096A",
      "telefono": "6XX XXX 175",
      "bonificacion": "estudiante",
      "bonificacionPct": 40,
      "iniciales": "SM"
    },
    {
      "id": "u10",
      "nombre": "Daniel Vega Soto",
      "edad": 17,
      "municipio": "navalespino",
      "nucleo": "cerro-alto",
      "perfil": "estudiante",
      "canal": "WhatsApp",
      "dni": "00000102G",
      "telefono": "6XX XXX 529",
      "bonificacion": "estudiante",
      "bonificacionPct": 40,
      "iniciales": "DV"
    },
    {
      "id": "u11",
      "nombre": "Lucía Prieto Gómez",
      "edad": 34,
      "municipio": "santa-olalla",
      "nucleo": "las-huertas",
      "perfil": "general",
      "canal": "WhatsApp",
      "dni": "00000117D",
      "telefono": "6XX XXX 384",
      "bonificacion": null,
      "bonificacionPct": 0,
      "iniciales": "LP"
    },
    {
      "id": "u12",
      "nombre": "Rafael Cano Bermejo",
      "edad": 69,
      "municipio": "fuentelviejo",
      "nucleo": "fuentelviejo",
      "perfil": "mayor",
      "canal": "teléfono",
      "dni": "00000129L",
      "telefono": "6XX XXX 947",
      "bonificacion": "mayor",
      "bonificacionPct": 50,
      "iniciales": "RC"
    }
  ],
  "rutas": [
    {
      "id": "R1",
      "nombre": "Robledillo · El Chaparral",
      "vehiculo": "1177 KJR",
      "conductor": "c2",
      "color": "--ruta-r1",
      "servicios": [
        {
          "id": "R1-1",
          "nombre": "Escolar",
          "paradas": [
            {"parada": "P09", "prevista": "07:12", "retraso": 0, "estimada": "07:12", "suben": ["TAD-2026-04135"], "bajan": []},
            {"parada": "P08", "prevista": "07:22", "retraso": 0, "estimada": "07:22", "suben": ["TAD-2026-04136"], "bajan": []},
            {"parada": "P07", "prevista": "07:32", "retraso": 0, "estimada": "07:32", "suben": ["TAD-2026-04137"], "bajan": []},
            {
              "parada": "P03",
              "prevista": "07:45",
              "retraso": 0,
              "estimada": "07:45",
              "suben": [],
              "bajan": ["TAD-2026-04135", "TAD-2026-04136", "TAD-2026-04137"]
            }
          ],
          "trazado": [[40.9588, -3.6238], [40.95527, -3.63518], [40.9453, -3.6417], [40.93884, -3.60894], [40.9163, -3.5843], [40.91387, -3.59732], [40.9037, -3.6058]],
          "inicio": "07:12",
          "fin": "07:45"
        },
        {
          "id": "R1-2",
          "nombre": "Centro de salud y gestiones",
          "paradas": [
            {"parada": "P08", "prevista": "09:10", "retraso": 0, "estimada": "09:10", "suben": ["TAD-2026-04162"], "bajan": []},
            {"parada": "P10", "prevista": "09:18", "retraso": 0, "estimada": "09:18", "suben": [], "bajan": []},
            {"parada": "P07", "prevista": "09:30", "retraso": 0, "estimada": "09:30", "suben": ["TAD-2026-04165"], "bajan": []},
            {"parada": "P02", "prevista": "09:48", "retraso": 0, "estimada": "09:48", "suben": [], "bajan": ["TAD-2026-04162"]},
            {"parada": "P01", "prevista": "09:55", "retraso": 0, "estimada": "09:55", "suben": [], "bajan": ["TAD-2026-04165"]}
          ],
          "trazado": [
            [40.9453, -3.6417],
            [40.94122, -3.65407],
            [40.9302, -3.661],
            [40.93399, -3.6207],
            [40.9163, -3.5843],
            [40.90931, -3.59297],
            [40.8984, -3.5952],
            [40.89872, -3.59831],
            [40.9006, -3.6008]
          ],
          "inicio": "09:10",
          "fin": "09:55"
        }
      ],
      "km": 30,
      "retrasoMin": 0,
      "aBordo": 6,
      "proximaParada": "P02",
      "minutosProxima": 8,
      "ocupacion": 50
    },
    {
      "id": "R2",
      "nombre": "Fuentelviejo · Santa Olalla · Navalespino",
      "vehiculo": "4521 LKT",
      "conductor": "c1",
      "color": "--ruta-r2",
      "servicios": [
        {
          "id": "R2-1",
          "nombre": "Escolar",
          "paradas": [
            {"parada": "P17", "prevista": "07:10", "retraso": 0, "estimada": "07:10", "suben": ["TAD-2026-04131", "TAD-2026-04132"], "bajan": []},
            {"parada": "P12", "prevista": "07:22", "retraso": 0, "estimada": "07:22", "suben": ["TAD-2026-04133", "TAD-2026-04134"], "bajan": []},
            {
              "parada": "P03",
              "prevista": "07:48",
              "retraso": 0,
              "estimada": "07:48",
              "suben": [],
              "bajan": ["TAD-2026-04131", "TAD-2026-04132", "TAD-2026-04133"]
            },
            {"parada": "P04", "prevista": "07:56", "retraso": 0, "estimada": "07:56", "suben": [], "bajan": ["TAD-2026-04134"]}
          ],
          "trazado": [[40.8647, -3.6507], [40.8474, -3.61519], [40.8567, -3.5768], [40.87614, -3.59788], [40.9037, -3.6058], [40.89953, -3.60662], [40.8958, -3.6046]],
          "inicio": "07:10",
          "fin": "07:56"
        },
        {
          "id": "R2-2",
          "nombre": "Centro de salud y gestiones",
          "paradas": [
            {"parada": "P17", "prevista": "09:05", "retraso": 0, "estimada": "09:05", "suben": ["TAD-2026-04158"], "bajan": []},
            {"parada": "P12", "prevista": "09:18", "retraso": 6, "estimada": "09:24", "suben": ["TAD-2026-04161"], "bajan": []},
            {"parada": "P13", "prevista": "09:24", "retraso": 10, "estimada": "09:34", "suben": [], "bajan": []},
            {
              "parada": "P11",
              "prevista": "09:30",
              "retraso": 12,
              "estimada": "09:42",
              "suben": ["TAD-2026-04176", "TAD-2026-04179"],
              "bajan": ["TAD-2026-04161"]
            },
            {"parada": "P14", "prevista": "10:00", "retraso": 12, "estimada": "10:12", "suben": ["TAD-2026-04187"], "bajan": []},
            {
              "parada": "P02",
              "prevista": "10:29",
              "retraso": 12,
              "estimada": "10:41",
              "suben": [],
              "bajan": ["TAD-2026-04176", "TAD-2026-04179", "TAD-2026-04187"]
            },
            {"parada": "P01", "prevista": "10:35", "retraso": 12, "estimada": "10:47", "suben": [], "bajan": ["TAD-2026-04158"]}
          ],
          "trazado": [
            [40.8647, -3.6507],
            [40.8474, -3.61519],
            [40.8567, -3.5768],
            [40.86059, -3.57271],
            [40.8618, -3.5672],
            [40.86442, -3.56129],
            [40.8702, -3.5584],
            [40.90486, -3.55996],
            [40.9353, -3.5433],
            [40.92619, -3.57589],
            [40.8984, -3.5952],
            [40.89872, -3.59831],
            [40.9006, -3.6008]
          ],
          "inicio": "09:05",
          "fin": "10:47"
        }
      ],
      "km": 48,
      "retrasoMin": 12,
      "aBordo": 5,
      "proximaParada": "P11",
      "minutosProxima": 2,
      "ocupacion": 31,
      "seguimiento": {"hora": "10:08", "aBordo": 7, "proximaParada": "P14", "minutos": 4}
    },
    {
      "id": "R3",
      "nombre": "Santa Olalla · Centro de día",
      "vehiculo": "9951 KZD",
      "conductor": "c3",
      "relevo": {"desde": "15:00", "conductor": "c5"},
      "color": "--ruta-r3",
      "servicios": [
        {
          "id": "R3-1",
          "nombre": "Centro de día",
          "paradas": [
            {"parada": "P11", "prevista": "09:10", "retraso": 0, "estimada": "09:10", "suben": ["TAD-2026-04166"], "bajan": []},
            {"parada": "P05", "prevista": "09:50", "retraso": 0, "estimada": "09:50", "suben": [], "bajan": ["TAD-2026-04166"]}
          ],
          "trazado": [[40.8702, -3.5584], [40.89296, -3.57189], [40.9019, -3.5968]],
          "inicio": "09:10",
          "fin": "09:50"
        },
        {
          "id": "R3-2",
          "nombre": "Regreso de tarde",
          "paradas": [
            {
              "parada": "P03",
              "prevista": "16:10",
              "retraso": 0,
              "estimada": "16:10",
              "suben": ["TAD-2026-04203", "TAD-2026-04204", "TAD-2026-04205"],
              "bajan": []
            },
            {"parada": "P05", "prevista": "16:20", "retraso": 0, "estimada": "16:20", "suben": ["TAD-2026-04201"], "bajan": []},
            {"parada": "P11", "prevista": "16:40", "retraso": 0, "estimada": "16:40", "suben": [], "bajan": ["TAD-2026-04201"]},
            {"parada": "P17", "prevista": "16:58", "retraso": 0, "estimada": "16:58", "suben": [], "bajan": ["TAD-2026-04203"]},
            {"parada": "P09", "prevista": "17:20", "retraso": 0, "estimada": "17:20", "suben": [], "bajan": ["TAD-2026-04204"]},
            {"parada": "P15", "prevista": "17:38", "retraso": 0, "estimada": "17:38", "suben": [], "bajan": ["TAD-2026-04205"]}
          ],
          "trazado": [
            [40.9037, -3.6058],
            [40.90118, -3.60162],
            [40.9019, -3.5968],
            [40.89143, -3.57316],
            [40.8702, -3.5584],
            [40.88406, -3.60554],
            [40.8647, -3.6507],
            [40.91552, -3.65042],
            [40.9588, -3.6238],
            [40.9402, -3.57684],
            [40.9558, -3.5288]
          ],
          "inicio": "16:10",
          "fin": "17:38"
        }
      ],
      "km": 50,
      "retrasoMin": 0,
      "aBordo": 9,
      "proximaParada": "P05",
      "minutosProxima": 10,
      "ocupacion": 47
    },
    {
      "id": "R4",
      "nombre": "Navalespino norte",
      "vehiculo": "2293 MFG",
      "conductor": "c4",
      "color": "--ruta-r4",
      "servicios": [
        {
          "id": "R4-1",
          "nombre": "Escolar",
          "paradas": [
            {"parada": "P15", "prevista": "07:20", "retraso": 0, "estimada": "07:20", "suben": ["TAD-2026-04138"], "bajan": []},
            {"parada": "P16", "prevista": "07:30", "retraso": 0, "estimada": "07:30", "suben": ["TAD-2026-04139"], "bajan": []},
            {"parada": "P03", "prevista": "07:52", "retraso": 0, "estimada": "07:52", "suben": [], "bajan": ["TAD-2026-04138", "TAD-2026-04139"]}
          ],
          "trazado": [[40.9558, -3.5288], [40.93809, -3.52981], [40.9238, -3.5193], [40.90164, -3.55974], [40.9037, -3.6058]],
          "inicio": "07:20",
          "fin": "07:52"
        },
        {
          "id": "R4-2",
          "nombre": "Conexión con la estación",
          "paradas": [
            {"parada": "P16", "prevista": "09:25", "retraso": 0, "estimada": "09:25", "suben": ["TAD-2026-04170"], "bajan": []},
            {"parada": "P04", "prevista": "09:55", "retraso": 0, "estimada": "09:55", "suben": [], "bajan": ["TAD-2026-04170"]}
          ],
          "trazado": [[40.9238, -3.5193], [40.92515, -3.56699], [40.8958, -3.6046]],
          "inicio": "09:25",
          "fin": "09:55"
        }
      ],
      "km": 26,
      "retrasoMin": 0,
      "aBordo": 3,
      "proximaParada": "P04",
      "minutosProxima": 15,
      "ocupacion": 38
    }
  ],
  "reservas": [
    {
      "codigo": "TAD-2026-04131",
      "usuario": "u02",
      "ruta": "R2",
      "servicio": "R2-1",
      "origen": "P17",
      "destino": "P03",
      "viajeros": 1,
      "perfil": "estudiante",
      "tarifaUnitaria": 1.32,
      "importe": 1.32,
      "estado": "Finalizada",
      "pago": "Tarjeta en app",
      "canal": "app",
      "fecha": "2026-04-14",
      "nota": null,
      "horaPrevista": "07:10",
      "horaLlegadaPrevista": "07:48"
    },
    {
      "codigo": "TAD-2026-04132",
      "usuario": "u12",
      "ruta": "R2",
      "servicio": "R2-1",
      "origen": "P17",
      "destino": "P03",
      "viajeros": 1,
      "perfil": "estudiante",
      "tarifaUnitaria": 1.32,
      "importe": 1.32,
      "estado": "Finalizada",
      "pago": "Pago a bordo",
      "canal": "teléfono",
      "fecha": "2026-04-14",
      "nota": "Reserva para su nieto, Hugo Cano.",
      "horaPrevista": "07:10",
      "horaLlegadaPrevista": "07:48"
    },
    {
      "codigo": "TAD-2026-04133",
      "usuario": "u11",
      "ruta": "R2",
      "servicio": "R2-1",
      "origen": "P12",
      "destino": "P03",
      "viajeros": 1,
      "perfil": "estudiante",
      "tarifaUnitaria": 1.32,
      "importe": 1.32,
      "estado": "Finalizada",
      "pago": "Bizum",
      "canal": "WhatsApp",
      "fecha": "2026-04-14",
      "nota": "Reserva para su hijo, Pablo Prieto.",
      "horaPrevista": "07:22",
      "horaLlegadaPrevista": "07:48"
    },
    {
      "codigo": "TAD-2026-04134",
      "usuario": "u05",
      "ruta": "R2",
      "servicio": "R2-1",
      "origen": "P12",
      "destino": "P04",
      "viajeros": 1,
      "perfil": "general",
      "tarifaUnitaria": 2.2,
      "importe": 2.2,
      "estado": "Finalizada",
      "pago": "Tarjeta en app",
      "canal": "app",
      "fecha": "2026-04-14",
      "nota": "Reserva para su hija, Marta Ruiz.",
      "horaPrevista": "07:22",
      "horaLlegadaPrevista": "07:56"
    },
    {
      "codigo": "TAD-2026-04135",
      "usuario": "u09",
      "ruta": "R1",
      "servicio": "R1-1",
      "origen": "P09",
      "destino": "P03",
      "viajeros": 1,
      "perfil": "estudiante",
      "tarifaUnitaria": 1.32,
      "importe": 1.32,
      "estado": "Finalizada",
      "pago": "Tarjeta en app",
      "canal": "app",
      "fecha": "2026-04-14",
      "nota": null,
      "horaPrevista": "07:12",
      "horaLlegadaPrevista": "07:45"
    },
    {
      "codigo": "TAD-2026-04136",
      "usuario": "u06",
      "ruta": "R1",
      "servicio": "R1-1",
      "origen": "P08",
      "destino": "P03",
      "viajeros": 1,
      "perfil": "estudiante",
      "tarifaUnitaria": 1.32,
      "importe": 1.32,
      "estado": "Finalizada",
      "pago": "Pago a bordo",
      "canal": "teléfono",
      "fecha": "2026-04-14",
      "nota": "Reserva para su nieto, Jorge Ortiz.",
      "horaPrevista": "07:22",
      "horaLlegadaPrevista": "07:45"
    },
    {
      "codigo": "TAD-2026-04137",
      "usuario": "u07",
      "ruta": "R1",
      "servicio": "R1-1",
      "origen": "P07",
      "destino": "P03",
      "viajeros": 2,
      "perfil": "familia numerosa",
      "tarifaUnitaria": 1.2,
      "importe": 2.4,
      "estado": "Finalizada",
      "pago": "Tarjeta en app",
      "canal": "app",
      "fecha": "2026-04-14",
      "nota": "Sus dos hijos mayores.",
      "horaPrevista": "07:32",
      "horaLlegadaPrevista": "07:45"
    },
    {
      "codigo": "TAD-2026-04138",
      "usuario": "u10",
      "ruta": "R4",
      "servicio": "R4-1",
      "origen": "P15",
      "destino": "P03",
      "viajeros": 1,
      "perfil": "estudiante",
      "tarifaUnitaria": 1.32,
      "importe": 1.32,
      "estado": "Finalizada",
      "pago": "Bizum",
      "canal": "WhatsApp",
      "fecha": "2026-04-14",
      "nota": null,
      "horaPrevista": "07:20",
      "horaLlegadaPrevista": "07:52"
    },
    {
      "codigo": "TAD-2026-04139",
      "usuario": "u08",
      "ruta": "R4",
      "servicio": "R4-1",
      "origen": "P16",
      "destino": "P03",
      "viajeros": 1,
      "perfil": "estudiante",
      "tarifaUnitaria": 1.32,
      "importe": 1.32,
      "estado": "Finalizada",
      "pago": "Bizum",
      "canal": "WhatsApp",
      "fecha": "2026-04-14",
      "nota": "Reserva para su hijo, Álvaro Gil.",
      "horaPrevista": "07:30",
      "horaLlegadaPrevista": "07:52"
    },
    {
      "codigo": "TAD-2026-04158",
      "usuario": "u12",
      "ruta": "R2",
      "servicio": "R2-2",
      "origen": "P17",
      "destino": "P01",
      "viajeros": 4,
      "perfil": "mayor",
      "tarifaUnitaria": 1.1,
      "importe": 4.4,
      "estado": "En curso",
      "pago": "Pago a bordo",
      "canal": "teléfono",
      "fecha": "2026-04-14",
      "nota": "Viaja con tres vecinos al mercado de los martes.",
      "horaPrevista": "09:05",
      "horaLlegadaPrevista": "10:35"
    },
    {
      "codigo": "TAD-2026-04161",
      "usuario": "u11",
      "ruta": "R2",
      "servicio": "R2-2",
      "origen": "P12",
      "destino": "P11",
      "viajeros": 1,
      "perfil": "general",
      "tarifaUnitaria": 1.5,
      "importe": 1.5,
      "estado": "En curso",
      "pago": "Bizum",
      "canal": "WhatsApp",
      "fecha": "2026-04-14",
      "nota": "Cita en el consultorio.",
      "horaPrevista": "09:18",
      "horaLlegadaPrevista": "09:30"
    },
    {
      "codigo": "TAD-2026-04162",
      "usuario": "u06",
      "ruta": "R1",
      "servicio": "R1-2",
      "origen": "P08",
      "destino": "P02",
      "viajeros": 2,
      "perfil": "PMR",
      "tarifaUnitaria": 1.1,
      "importe": 2.2,
      "estado": "En curso",
      "pago": "Pago a bordo",
      "canal": "teléfono",
      "fecha": "2026-04-14",
      "nota": "Viaja con acompañante. Silla de ruedas: necesita elevador.",
      "horaPrevista": "09:10",
      "horaLlegadaPrevista": "09:48"
    },
    {
      "codigo": "TAD-2026-04165",
      "usuario": "u07",
      "ruta": "R1",
      "servicio": "R1-2",
      "origen": "P07",
      "destino": "P01",
      "viajeros": 4,
      "perfil": "familia numerosa",
      "tarifaUnitaria": 1.2,
      "importe": 4.8,
      "estado": "En curso",
      "pago": "Tarjeta en app",
      "canal": "app",
      "fecha": "2026-04-14",
      "nota": "Viaja con sus tres hijos pequeños.",
      "horaPrevista": "09:30",
      "horaLlegadaPrevista": "09:55"
    },
    {
      "codigo": "TAD-2026-04166",
      "usuario": "u04",
      "ruta": "R3",
      "servicio": "R3-1",
      "origen": "P11",
      "destino": "P05",
      "viajeros": 9,
      "perfil": "mayor",
      "tarifaUnitaria": 1.1,
      "importe": 9.9,
      "estado": "En curso",
      "pago": "Factura al ayuntamiento",
      "canal": "WhatsApp",
      "fecha": "2026-04-14",
      "nota": "Grupo del centro de día de Valdecerro.",
      "horaPrevista": "09:10",
      "horaLlegadaPrevista": "09:50"
    },
    {
      "codigo": "TAD-2026-04170",
      "usuario": "u08",
      "ruta": "R4",
      "servicio": "R4-2",
      "origen": "P16",
      "destino": "P04",
      "viajeros": 3,
      "perfil": "general",
      "tarifaUnitaria": 2.2,
      "importe": 6.6,
      "estado": "En curso",
      "pago": "Bizum",
      "canal": "WhatsApp",
      "fecha": "2026-04-14",
      "nota": "Viaja con su mujer y su hija. Conexión con el autobús de las 10:15.",
      "horaPrevista": "09:25",
      "horaLlegadaPrevista": "09:55"
    },
    {
      "codigo": "TAD-2026-04176",
      "usuario": "u03",
      "ruta": "R2",
      "servicio": "R2-2",
      "origen": "P11",
      "destino": "P02",
      "viajeros": 1,
      "perfil": "mayor",
      "tarifaUnitaria": 1.1,
      "importe": 1.1,
      "estado": "Confirmada",
      "pago": "Pago a bordo",
      "canal": "teléfono",
      "fecha": "2026-04-14",
      "nota": null,
      "horaPrevista": "09:30",
      "horaLlegadaPrevista": "10:29"
    },
    {
      "codigo": "TAD-2026-04179",
      "usuario": "u05",
      "ruta": "R2",
      "servicio": "R2-2",
      "origen": "P11",
      "destino": "P02",
      "viajeros": 2,
      "perfil": "PMR",
      "tarifaUnitaria": 1.1,
      "importe": 2.2,
      "estado": "Confirmada",
      "pago": "Tarjeta en app",
      "canal": "app",
      "fecha": "2026-04-14",
      "nota": "Viaja con acompañante. Necesita rampa.",
      "horaPrevista": "09:30",
      "horaLlegadaPrevista": "10:29"
    },
    {
      "codigo": "TAD-2026-04187",
      "usuario": "u01",
      "ruta": "R2",
      "servicio": "R2-2",
      "origen": "P14",
      "destino": "P02",
      "viajeros": 1,
      "perfil": "mayor",
      "tarifaUnitaria": 1.1,
      "importe": 1.1,
      "estado": "Confirmada",
      "pago": "Tarjeta en app",
      "canal": "teléfono",
      "fecha": "2026-04-14",
      "nota": "Cita a las 10:45 en el Centro de Salud. Viaja con andador.",
      "horaPrevista": "10:00",
      "horaLlegadaPrevista": "10:29"
    },
    {
      "codigo": "TAD-2026-04201",
      "usuario": "u04",
      "ruta": "R3",
      "servicio": "R3-2",
      "origen": "P05",
      "destino": "P11",
      "viajeros": 9,
      "perfil": "mayor",
      "tarifaUnitaria": 1.1,
      "importe": 9.9,
      "estado": "Confirmada",
      "pago": "Factura al ayuntamiento",
      "canal": "WhatsApp",
      "fecha": "2026-04-14",
      "nota": "Regreso del grupo del centro de día.",
      "horaPrevista": "16:20",
      "horaLlegadaPrevista": "16:40"
    },
    {
      "codigo": "TAD-2026-04203",
      "usuario": "u02",
      "ruta": "R3",
      "servicio": "R3-2",
      "origen": "P03",
      "destino": "P17",
      "viajeros": 1,
      "perfil": "estudiante",
      "tarifaUnitaria": 1.32,
      "importe": 1.32,
      "estado": "Confirmada",
      "pago": "Tarjeta en app",
      "canal": "app",
      "fecha": "2026-04-14",
      "nota": null,
      "horaPrevista": "16:10",
      "horaLlegadaPrevista": "16:58"
    },
    {
      "codigo": "TAD-2026-04204",
      "usuario": "u09",
      "ruta": "R3",
      "servicio": "R3-2",
      "origen": "P03",
      "destino": "P09",
      "viajeros": 1,
      "perfil": "estudiante",
      "tarifaUnitaria": 1.32,
      "importe": 1.32,
      "estado": "Confirmada",
      "pago": "Tarjeta en app",
      "canal": "app",
      "fecha": "2026-04-14",
      "nota": null,
      "horaPrevista": "16:10",
      "horaLlegadaPrevista": "17:20"
    },
    {
      "codigo": "TAD-2026-04205",
      "usuario": "u10",
      "ruta": "R3",
      "servicio": "R3-2",
      "origen": "P03",
      "destino": "P15",
      "viajeros": 1,
      "perfil": "estudiante",
      "tarifaUnitaria": 1.32,
      "importe": 1.32,
      "estado": "Confirmada",
      "pago": "Bizum",
      "canal": "WhatsApp",
      "fecha": "2026-04-14",
      "nota": null,
      "horaPrevista": "16:10",
      "horaLlegadaPrevista": "17:38"
    },
    {
      "codigo": "TAD-2026-04159",
      "usuario": "u12",
      "ruta": null,
      "servicio": null,
      "origen": "P01",
      "destino": "P17",
      "viajeros": 4,
      "perfil": "mayor",
      "tarifaUnitaria": 1.1,
      "importe": 4.4,
      "estado": "Cancelada",
      "pago": "Pago a bordo",
      "canal": "teléfono",
      "fecha": "2026-04-14",
      "nota": "Cancelada a las 08:40 por WhatsApp: vuelven en el coche de un familiar.",
      "horaPrevista": "12:30",
      "rutaOriginal": "R2"
    },
    {
      "codigo": "TAD-2026-04212",
      "usuario": "u08",
      "ruta": null,
      "servicio": null,
      "origen": "P04",
      "destino": "P16",
      "viajeros": 3,
      "perfil": "general",
      "tarifaUnitaria": 2.2,
      "importe": 6.6,
      "estado": "Pendiente",
      "pago": "Bizum",
      "canal": "WhatsApp",
      "fecha": "2026-04-14",
      "nota": "Pidió las 19:30. Sin plazas a esa hora: se le ha propuesto las 18:45.",
      "horaPrevista": "19:30",
      "alternativa": "18:45"
    }
  ],
  "incidencias": [
    {
      "id": "INC-0412",
      "fecha": "2026-04-14",
      "hora": "09:28",
      "tipo": "Retraso",
      "prioridad": "Media",
      "estado": "Abierta",
      "ruta": "R2",
      "vehiculo": "4521 LKT",
      "titulo": "Retraso 12 min por obras en la CM-1004 (ruta R2)",
      "responsable": "op1",
      "descripcion": "Corte parcial de la CM-1004 entre Las Huertas y Santa Olalla. Desvío por el camino de Robledillo. Retraso estimado de 12 minutos en las paradas siguientes.",
      "historial": [
        {"hora": "09:22", "texto": "Aviso de la conductora por radio: obras en la CM-1004."},
        {"hora": "09:24", "texto": "Desvío por el camino de Robledillo."},
        {"hora": "09:28", "texto": "Incidencia abierta. Retraso estimado: 12 minutos."},
        {"hora": "09:31", "texto": "SMS y aviso en la app a los 3 viajeros afectados."}
      ],
      "afectados": ["TAD-2026-04176", "TAD-2026-04179", "TAD-2026-04187"]
    },
    {
      "id": "INC-0411",
      "fecha": "2026-04-14",
      "hora": "06:40",
      "tipo": "Avería",
      "prioridad": "Alta",
      "estado": "Cerrada",
      "ruta": "R3",
      "vehiculo": "6604 LBC",
      "titulo": "Vehículo 6604 LBC fuera de servicio, sustituido por 9951 KZD",
      "responsable": "op1",
      "descripcion": "Avería en el embrague detectada en la revisión previa a la salida. Se asigna el vehículo de reserva 9951 KZD (19 plazas, rampa PMR) a la ruta R3.",
      "historial": [
        {"hora": "06:40", "texto": "Avería detectada en la revisión de salida."},
        {"hora": "06:48", "texto": "Asignado el 9951 KZD como sustituto."},
        {"hora": "07:05", "texto": "6604 LBC trasladado al taller de Valdecerro."},
        {"hora": "07:10", "texto": "Incidencia cerrada. Ruta R3 sin cambios de horario."}
      ],
      "cierre": "07:10"
    },
    {
      "id": "INC-0409",
      "fecha": "2026-04-13",
      "hora": "17:05",
      "tipo": "Usuario no presentado",
      "prioridad": "Baja",
      "estado": "Cerrada",
      "ruta": "R1",
      "vehiculo": "1177 KJR",
      "titulo": "Viajero no presentado en La Dehesa",
      "responsable": "op1",
      "descripcion": "La conductora esperó 5 minutos. Se avisó al viajero por SMS.",
      "historial": [{"hora": "17:05", "texto": "Aviso de la conductora."}, {"hora": "17:12", "texto": "Incidencia cerrada."}],
      "cierre": "17:12"
    },
    {
      "id": "INC-0405",
      "fecha": "2026-04-10",
      "hora": "08:15",
      "tipo": "Retraso",
      "prioridad": "Media",
      "estado": "Cerrada",
      "ruta": "R4",
      "vehiculo": "2293 MFG",
      "titulo": "Retraso 8 min por niebla en el puerto",
      "responsable": "op1",
      "descripcion": "Niebla densa en el acceso a Cerro Alto.",
      "historial": [{"hora": "08:15", "texto": "Aviso del conductor."}, {"hora": "08:40", "texto": "Incidencia cerrada."}],
      "cierre": "08:40"
    },
    {
      "id": "INC-0398",
      "fecha": "2026-04-07",
      "hora": "12:30",
      "tipo": "Otra",
      "prioridad": "Baja",
      "estado": "Cerrada",
      "ruta": "R2",
      "vehiculo": "4521 LKT",
      "titulo": "Rampa PMR con ruido al desplegarse",
      "responsable": "op1",
      "descripcion": "Revisada en el taller el mismo día. Sin avería.",
      "historial": [{"hora": "12:30", "texto": "Aviso de la conductora."}, {"hora": "18:00", "texto": "Revisión en el taller. Incidencia cerrada."}],
      "cierre": "18:00"
    }
  ],
  "tarifas": {
    "zonas": [
      {"id": "A", "nombre": "Zona A", "descripcion": "Valdecerro (El Chaparral incluido)"},
      {"id": "B", "nombre": "Zona B", "descripcion": "Resto de municipios"}
    ],
    "precios": [{"tipo": "Dentro de la misma zona", "importe": 1.5}, {"tipo": "Entre zonas (interzona)", "importe": 2.2}],
    "bonificaciones": [
      {"perfil": "mayor", "nombre": "Mayores de 65", "pct": 50, "financia": "Ayuntamiento de residencia"},
      {"perfil": "PMR", "nombre": "Personas con movilidad reducida", "pct": 50, "financia": "Consorcio de Transportes"},
      {"perfil": "estudiante", "nombre": "Estudiantes", "pct": 40, "financia": "Consorcio de Transportes"},
      {"perfil": "familia numerosa", "nombre": "Familia numerosa", "pct": 20, "financia": "Ayuntamiento de residencia"}
    ],
    "pagos": [
      {"id": "tarjeta", "nombre": "Tarjeta en app", "activo": true},
      {"id": "bizum", "nombre": "Bizum", "activo": true},
      {"id": "bordo", "nombre": "Pago a bordo", "activo": true}
    ]
  },
  "reglas": {
    "franjas": [
      {"nombre": "Colegio e instituto", "desde": "07:00", "hasta": "09:00"},
      {"nombre": "Centro de salud y gestiones", "desde": "09:00", "hasta": "12:00"},
      {"nombre": "Regreso", "desde": "16:00", "hasta": "19:00"}
    ],
    "ventanaAntes": 15,
    "ventanaDespues": 10,
    "radioParadaVirtualM": 300,
    "antelacionMinimaMin": 60,
    "antelacionMaximaDias": 30,
    "prioridades": ["PMR", "Sanitario", "Escolar", "General"]
  },
  "optimizacion": {
    "reservas": 24,
    "rutas": 4,
    "reduccionKm": 38,
    "ocupacionMedia": 61,
    "co2Evitado": 42,
    "puntualidad": 94,
    "kmRutas": 154,
    "kmIndividual": 248,
    "explicacion": [
      "Se agruparon en la ruta R2 las 3 reservas con destino al Centro de Salud de Valdecerro (llegada prevista a las 10:29) y el grupo de Fuentelviejo que va a la Plaza Mayor.",
      "La reserva PMR de Ana Ruiz exige un vehículo con rampa: se asignó el 4521 LKT.",
      "El grupo del centro de día (9 personas) necesita un vehículo grande: se asignó el 9951 KZD, que además sustituye al 6604 LBC.",
      "La ventana de recogida de Josefa Martín (10:00, ±15 min) permite pasar antes por Santa Olalla sin superar el tiempo máximo de viaje."
    ]
  },
  "historial": [
    {"fecha": "2026-03-15", "viajes": 4, "viajeros": 9, "km": 41, "ocupacion": 41, "puntualidad": 97, "co2": 7.7},
    {"fecha": "2026-03-16", "viajes": 23, "viajeros": 50, "km": 187, "ocupacion": 61, "puntualidad": 95, "co2": 43.0},
    {"fecha": "2026-03-17", "viajes": 22, "viajeros": 47, "km": 172, "ocupacion": 61, "puntualidad": 95, "co2": 40.4},
    {"fecha": "2026-03-18", "viajes": 24, "viajeros": 51, "km": 190, "ocupacion": 62, "puntualidad": 93, "co2": 43.9},
    {"fecha": "2026-03-19", "viajes": 22, "viajeros": 48, "km": 181, "ocupacion": 59, "puntualidad": 94, "co2": 41.3},
    {"fecha": "2026-03-20", "viajes": 20, "viajeros": 44, "km": 169, "ocupacion": 60, "puntualidad": 94, "co2": 37.8},
    {"fecha": "2026-03-21", "viajes": 9, "viajeros": 17, "km": 68, "ocupacion": 43, "puntualidad": 97, "co2": 14.6},
    {"fecha": "2026-03-22", "viajes": 5, "viajeros": 11, "km": 40, "ocupacion": 46, "puntualidad": 97, "co2": 9.5},
    {"fecha": "2026-03-23", "viajes": 24, "viajeros": 52, "km": 193, "ocupacion": 58, "puntualidad": 93, "co2": 44.7},
    {"fecha": "2026-03-24", "viajes": 21, "viajeros": 45, "km": 166, "ocupacion": 59, "puntualidad": 93, "co2": 38.7},
    {"fecha": "2026-03-25", "viajes": 22, "viajeros": 47, "km": 178, "ocupacion": 58, "puntualidad": 93, "co2": 40.4},
    {"fecha": "2026-03-26", "viajes": 23, "viajeros": 49, "km": 184, "ocupacion": 60, "puntualidad": 95, "co2": 42.1},
    {"fecha": "2026-03-27", "viajes": 21, "viajeros": 45, "km": 172, "ocupacion": 61, "puntualidad": 95, "co2": 38.7},
    {"fecha": "2026-03-28", "viajes": 7, "viajeros": 18, "km": 70, "ocupacion": 44, "puntualidad": 97, "co2": 15.5},
    {"fecha": "2026-03-29", "viajes": 4, "viajeros": 9, "km": 41, "ocupacion": 41, "puntualidad": 97, "co2": 7.7},
    {"fecha": "2026-03-30", "viajes": 23, "viajeros": 50, "km": 187, "ocupacion": 61, "puntualidad": 95, "co2": 43.0},
    {"fecha": "2026-03-31", "viajes": 22, "viajeros": 47, "km": 172, "ocupacion": 61, "puntualidad": 95, "co2": 40.4},
    {"fecha": "2026-04-01", "viajes": 24, "viajeros": 51, "km": 190, "ocupacion": 62, "puntualidad": 93, "co2": 43.9},
    {"fecha": "2026-04-02", "viajes": 22, "viajeros": 48, "km": 181, "ocupacion": 59, "puntualidad": 94, "co2": 41.3},
    {"fecha": "2026-04-03", "viajes": 20, "viajeros": 44, "km": 169, "ocupacion": 60, "puntualidad": 94, "co2": 37.8},
    {"fecha": "2026-04-04", "viajes": 9, "viajeros": 17, "km": 68, "ocupacion": 43, "puntualidad": 97, "co2": 14.6},
    {"fecha": "2026-04-05", "viajes": 5, "viajeros": 11, "km": 40, "ocupacion": 46, "puntualidad": 97, "co2": 9.5},
    {"fecha": "2026-04-06", "viajes": 24, "viajeros": 52, "km": 193, "ocupacion": 58, "puntualidad": 93, "co2": 44.7},
    {"fecha": "2026-04-07", "viajes": 21, "viajeros": 45, "km": 166, "ocupacion": 59, "puntualidad": 93, "co2": 38.7},
    {"fecha": "2026-04-08", "viajes": 22, "viajeros": 47, "km": 178, "ocupacion": 58, "puntualidad": 93, "co2": 40.4},
    {"fecha": "2026-04-09", "viajes": 23, "viajeros": 49, "km": 184, "ocupacion": 60, "puntualidad": 95, "co2": 42.1},
    {"fecha": "2026-04-10", "viajes": 21, "viajeros": 45, "km": 172, "ocupacion": 61, "puntualidad": 95, "co2": 38.7},
    {"fecha": "2026-04-11", "viajes": 7, "viajeros": 18, "km": 70, "ocupacion": 44, "puntualidad": 97, "co2": 15.5},
    {"fecha": "2026-04-12", "viajes": 4, "viajeros": 9, "km": 41, "ocupacion": 41, "puntualidad": 97, "co2": 7.7},
    {"fecha": "2026-04-13", "viajes": 23, "viajeros": 50, "km": 187, "ocupacion": 61, "puntualidad": 95, "co2": 43.0}
  ],
  "mensual": [
    {"mes": "2025-10", "viajeros": 812, "viajes": 401, "km": 4680, "ocupacion": 54, "puntualidad": 92, "co2": 698, "costePorViajero": 11.82},
    {"mes": "2025-11", "viajeros": 905, "viajes": 446, "km": 4925, "ocupacion": 56, "puntualidad": 93, "co2": 778, "costePorViajero": 10.61},
    {"mes": "2025-12", "viajeros": 868, "viajes": 431, "km": 4810, "ocupacion": 55, "puntualidad": 92, "co2": 746, "costePorViajero": 11.06},
    {"mes": "2026-01", "viajeros": 941, "viajes": 468, "km": 5040, "ocupacion": 57, "puntualidad": 94, "co2": 809, "costePorViajero": 10.2},
    {"mes": "2026-02", "viajeros": 1012, "viajes": 497, "km": 5110, "ocupacion": 58, "puntualidad": 94, "co2": 870, "costePorViajero": 9.49},
    {"mes": "2026-03", "viajeros": 1172, "viajes": 543, "km": 4422, "ocupacion": 55, "puntualidad": 95, "co2": 1008, "costePorViajero": 8.19}
  ],
  "prediccion": [
    {"fecha": "2026-04-15", "viajeros": 54},
    {"fecha": "2026-04-16", "viajeros": 51},
    {"fecha": "2026-04-17", "viajeros": 47},
    {"fecha": "2026-04-18", "viajeros": 17},
    {"fecha": "2026-04-19", "viajeros": 11},
    {"fecha": "2026-04-20", "viajeros": 55},
    {"fecha": "2026-04-21", "viajeros": 48}
  ],
  "liquidacion": {
    "mes": "2026-03",
    "nombre": "Liquidación marzo 2026",
    "viajeros": 1172,
    "recaudacionUsuarios": 1548.6,
    "bonificacionesSubvencionadas": 2912.4,
    "aportacionMunicipal": 4950.0,
    "aportacionConsorcio": 2000.0,
    "ingresos": 11411.0,
    "costeOperacion": 9600.0,
    "desglose": [
      {"municipio": "valdecerro", "viajeros": 398, "recaudacion": 526.52, "bonificaciones": 990.22, "aportacion": 1683.0, "total": 3199.74},
      {"municipio": "robledillo", "viajeros": 234, "recaudacion": 309.72, "bonificaciones": 582.48, "aportacion": 990.0, "total": 1882.2},
      {"municipio": "santa-olalla", "viajeros": 246, "recaudacion": 325.21, "bonificaciones": 611.6, "aportacion": 1039.5, "total": 1976.31},
      {"municipio": "navalespino", "viajeros": 176, "recaudacion": 232.29, "bonificaciones": 436.86, "aportacion": 742.5, "total": 1411.65},
      {"municipio": "fuentelviejo", "viajeros": 118, "recaudacion": 154.86, "bonificaciones": 291.24, "aportacion": 495.0, "total": 941.1}
    ]
  },
  "liquidaciones": [
    {"mes": "2026-01", "importe": 10980.4, "estado": "Aprobada"},
    {"mes": "2026-02", "importe": 11125.9, "estado": "Aprobada"},
    {"mes": "2026-03", "importe": 11411.0, "estado": "En revisión"}
  ],
  "facturas": [
    {
      "numero": "AYT-2026-03-01",
      "tipo": "ayuntamiento",
      "fecha": "2026-04-03",
      "vence": "2026-05-03",
      "destinatario": "Ayuntamiento de Valdecerro",
      "concepto": "Aportación y bonificaciones de marzo 2026",
      "importe": 2673.22,
      "estado": "Pagada"
    },
    {
      "numero": "AYT-2026-03-02",
      "tipo": "ayuntamiento",
      "fecha": "2026-04-03",
      "vence": "2026-05-03",
      "destinatario": "Ayuntamiento de Robledillo de la Sierra",
      "concepto": "Aportación y bonificaciones de marzo 2026",
      "importe": 1572.48,
      "estado": "Pagada"
    },
    {
      "numero": "AYT-2026-03-03",
      "tipo": "ayuntamiento",
      "fecha": "2026-04-03",
      "vence": "2026-05-03",
      "destinatario": "Ayuntamiento de Santa Olalla del Río",
      "concepto": "Aportación y bonificaciones de marzo 2026",
      "importe": 1651.1,
      "estado": "Pendiente"
    },
    {
      "numero": "AYT-2026-03-04",
      "tipo": "ayuntamiento",
      "fecha": "2026-04-03",
      "vence": "2026-05-03",
      "destinatario": "Ayuntamiento de Navalespino",
      "concepto": "Aportación y bonificaciones de marzo 2026",
      "importe": 1179.36,
      "estado": "Pagada"
    },
    {
      "numero": "AYT-2026-03-05",
      "tipo": "ayuntamiento",
      "fecha": "2026-04-03",
      "vence": "2026-04-10",
      "destinatario": "Ayuntamiento de Fuentelviejo",
      "concepto": "Aportación y bonificaciones de marzo 2026",
      "importe": 786.24,
      "estado": "Vencida"
    },
    {
      "numero": "CON-2026-03-01",
      "tipo": "ayuntamiento",
      "fecha": "2026-04-03",
      "vence": "2026-05-03",
      "destinatario": "Consorcio de Transportes",
      "concepto": "Aportación del consorcio, marzo 2026",
      "importe": 2000.0,
      "estado": "Pendiente"
    },
    {
      "numero": "OPE-2026-03-01",
      "tipo": "operador",
      "fecha": "2026-04-02",
      "vence": "2026-05-02",
      "destinatario": "Transportes Comarcales Sierra Norte, S.L.",
      "concepto": "Servicio de conducción y vehículos, marzo 2026",
      "importe": 7420.0,
      "estado": "Pagada"
    },
    {
      "numero": "OPE-2026-03-02",
      "tipo": "operador",
      "fecha": "2026-04-02",
      "vence": "2026-05-02",
      "destinatario": "Taller Hermanos Benito",
      "concepto": "Mantenimiento preventivo de la flota, marzo 2026",
      "importe": 1180.0,
      "estado": "Pendiente"
    },
    {
      "numero": "REC-2026-04131",
      "tipo": "usuario",
      "fecha": "2026-04-14",
      "destinatario": "Iván Serrano Gil",
      "concepto": "Billete TAD-2026-04131",
      "reserva": "TAD-2026-04131",
      "importe": 1.32,
      "estado": "Pagada"
    },
    {
      "numero": "REC-2026-04132",
      "tipo": "usuario",
      "fecha": "2026-04-14",
      "destinatario": "Rafael Cano Bermejo",
      "concepto": "Billete TAD-2026-04132",
      "reserva": "TAD-2026-04132",
      "importe": 1.32,
      "estado": "Pagada"
    },
    {
      "numero": "REC-2026-04133",
      "tipo": "usuario",
      "fecha": "2026-04-14",
      "destinatario": "Lucía Prieto Gómez",
      "concepto": "Billete TAD-2026-04133",
      "reserva": "TAD-2026-04133",
      "importe": 1.32,
      "estado": "Pagada"
    },
    {
      "numero": "REC-2026-04134",
      "tipo": "usuario",
      "fecha": "2026-04-14",
      "destinatario": "Ana Ruiz Calvo",
      "concepto": "Billete TAD-2026-04134",
      "reserva": "TAD-2026-04134",
      "importe": 2.2,
      "estado": "Pagada"
    },
    {
      "numero": "REC-2026-04135",
      "tipo": "usuario",
      "fecha": "2026-04-14",
      "destinatario": "Sara Molina Ríos",
      "concepto": "Billete TAD-2026-04135",
      "reserva": "TAD-2026-04135",
      "importe": 1.32,
      "estado": "Pagada"
    },
    {
      "numero": "REC-2026-04136",
      "tipo": "usuario",
      "fecha": "2026-04-14",
      "destinatario": "Manuel Ortiz Peña",
      "concepto": "Billete TAD-2026-04136",
      "reserva": "TAD-2026-04136",
      "importe": 1.32,
      "estado": "Pagada"
    },
    {
      "numero": "REC-2026-04137",
      "tipo": "usuario",
      "fecha": "2026-04-14",
      "destinatario": "Elena Navarro Gil",
      "concepto": "Billete TAD-2026-04137",
      "reserva": "TAD-2026-04137",
      "importe": 2.4,
      "estado": "Pagada"
    },
    {
      "numero": "REC-2026-04138",
      "tipo": "usuario",
      "fecha": "2026-04-14",
      "destinatario": "Daniel Vega Soto",
      "concepto": "Billete TAD-2026-04138",
      "reserva": "TAD-2026-04138",
      "importe": 1.32,
      "estado": "Pagada"
    },
    {
      "numero": "REC-2026-04139",
      "tipo": "usuario",
      "fecha": "2026-04-14",
      "destinatario": "Ramón Gil Esteban",
      "concepto": "Billete TAD-2026-04139",
      "reserva": "TAD-2026-04139",
      "importe": 1.32,
      "estado": "Pagada"
    },
    {
      "numero": "REC-2026-04158",
      "tipo": "usuario",
      "fecha": "2026-04-14",
      "destinatario": "Rafael Cano Bermejo",
      "concepto": "Billete TAD-2026-04158",
      "reserva": "TAD-2026-04158",
      "importe": 4.4,
      "estado": "Pendiente"
    },
    {
      "numero": "REC-2026-04161",
      "tipo": "usuario",
      "fecha": "2026-04-14",
      "destinatario": "Lucía Prieto Gómez",
      "concepto": "Billete TAD-2026-04161",
      "reserva": "TAD-2026-04161",
      "importe": 1.5,
      "estado": "Pagada"
    },
    {
      "numero": "REC-2026-04162",
      "tipo": "usuario",
      "fecha": "2026-04-14",
      "destinatario": "Manuel Ortiz Peña",
      "concepto": "Billete TAD-2026-04162",
      "reserva": "TAD-2026-04162",
      "importe": 2.2,
      "estado": "Pendiente"
    },
    {
      "numero": "REC-2026-04165",
      "tipo": "usuario",
      "fecha": "2026-04-14",
      "destinatario": "Elena Navarro Gil",
      "concepto": "Billete TAD-2026-04165",
      "reserva": "TAD-2026-04165",
      "importe": 4.8,
      "estado": "Pagada"
    },
    {
      "numero": "REC-2026-04170",
      "tipo": "usuario",
      "fecha": "2026-04-14",
      "destinatario": "Ramón Gil Esteban",
      "concepto": "Billete TAD-2026-04170",
      "reserva": "TAD-2026-04170",
      "importe": 6.6,
      "estado": "Pagada"
    },
    {
      "numero": "REC-2026-04176",
      "tipo": "usuario",
      "fecha": "2026-04-14",
      "destinatario": "Tomás Sanz Herrero",
      "concepto": "Billete TAD-2026-04176",
      "reserva": "TAD-2026-04176",
      "importe": 1.1,
      "estado": "Pendiente"
    },
    {
      "numero": "REC-2026-04179",
      "tipo": "usuario",
      "fecha": "2026-04-14",
      "destinatario": "Ana Ruiz Calvo",
      "concepto": "Billete TAD-2026-04179",
      "reserva": "TAD-2026-04179",
      "importe": 2.2,
      "estado": "Pagada"
    },
    {
      "numero": "REC-2026-04187",
      "tipo": "usuario",
      "fecha": "2026-04-14",
      "destinatario": "Josefa Martín Ruiz",
      "concepto": "Billete TAD-2026-04187",
      "reserva": "TAD-2026-04187",
      "importe": 1.1,
      "estado": "Pagada"
    },
    {
      "numero": "REC-2026-04203",
      "tipo": "usuario",
      "fecha": "2026-04-14",
      "destinatario": "Iván Serrano Gil",
      "concepto": "Billete TAD-2026-04203",
      "reserva": "TAD-2026-04203",
      "importe": 1.32,
      "estado": "Pagada"
    },
    {
      "numero": "REC-2026-04204",
      "tipo": "usuario",
      "fecha": "2026-04-14",
      "destinatario": "Sara Molina Ríos",
      "concepto": "Billete TAD-2026-04204",
      "reserva": "TAD-2026-04204",
      "importe": 1.32,
      "estado": "Pagada"
    },
    {
      "numero": "REC-2026-04205",
      "tipo": "usuario",
      "fecha": "2026-04-14",
      "destinatario": "Daniel Vega Soto",
      "concepto": "Billete TAD-2026-04205",
      "reserva": "TAD-2026-04205",
      "importe": 1.32,
      "estado": "Pagada"
    }
  ],
  "conversaciones": [
    {
      "id": "cv1",
      "usuario": "u01",
      "canal": "teléfono",
      "hora": "08:52",
      "estado": "Resuelta",
      "asunto": "Reserva para el centro de salud",
      "atendidaPor": "Asistente de voz",
      "duracion": "2 min 41 s",
      "reserva": "TAD-2026-04187",
      "resumen": "Josefa llama para ir hoy al Centro de Salud de Valdecerro (cita a las 10:45). El asistente le ofrece la recogida de las 10:00 en la Iglesia de Navalespino, le recuerda la bonificación de mayor (50 %) y confirma la reserva. Se envía SMS de confirmación.",
      "mensajes": [
        {
          "hora": "08:52",
          "de": "ciudadano",
          "texto": "Buenos días, quería un viaje para hoy al centro de salud de Valdecerro, que tengo cita a las once menos cuarto."
        },
        {
          "hora": "08:52",
          "de": "asistente",
          "texto": "Buenos días, Josefa. Tengo plaza con recogida a las 10:00 en la parada de la Iglesia de Navalespino. Llegaría al centro de salud sobre las 10:30. ¿Le viene bien?"
        },
        {"hora": "08:53", "de": "ciudadano", "texto": "Sí, muy bien. Voy con el andador."},
        {
          "hora": "08:53",
          "de": "asistente",
          "texto": "Anotado. Le asignamos un vehículo con rampa. Con su bonificación de mayor, el viaje le cuesta 1,10 euros. Le envío un SMS con los datos. ¿Algo más?"
        },
        {"hora": "08:54", "de": "ciudadano", "texto": "No, gracias, hija."},
        {"hora": "08:54", "de": "sistema", "texto": "Reserva TAD-2026-04187 creada y confirmada. SMS enviado al 6XX XXX 123."}
      ]
    },
    {
      "id": "cv2",
      "usuario": "u08",
      "canal": "WhatsApp",
      "hora": "09:05",
      "estado": "Pendiente",
      "asunto": "Regreso desde la estación",
      "reserva": "TAD-2026-04212",
      "mensajes": [
        {"hora": "09:05", "de": "ciudadano", "texto": "Hola, ¿podéis recogerme esta tarde a las 19:30 en la estación de autobuses? Somos tres."},
        {
          "hora": "09:06",
          "de": "asistente",
          "texto": "Hola, Ramón. A las 19:30 no quedan plazas para tres personas. Te puedo ofrecer las 18:45 desde la Estación de autobuses hasta el Cruce de La Majada. ¿Te reservo esa hora?"
        },
        {"hora": "09:14", "de": "ciudadano", "texto": "Déjame que lo mire con mi mujer y te digo."}
      ]
    },
    {
      "id": "cv3",
      "usuario": "u12",
      "canal": "WhatsApp",
      "hora": "08:40",
      "estado": "Resuelta",
      "asunto": "Cancelación del regreso",
      "reserva": "TAD-2026-04159",
      "mensajes": [
        {"hora": "08:40", "de": "ciudadano", "texto": "Buenos días, cancelad la vuelta de las 12:30, que nos trae mi hijo en el coche."},
        {"hora": "08:40", "de": "asistente", "texto": "Hecho, Rafael. Hemos cancelado la reserva TAD-2026-04159. La ida de las 09:05 sigue en pie."},
        {"hora": "08:41", "de": "ciudadano", "texto": "Gracias."}
      ]
    },
    {
      "id": "cv4",
      "usuario": "u04",
      "canal": "email",
      "hora": "Ayer",
      "estado": "Resuelta",
      "asunto": "Grupo del centro de día",
      "mensajes": [
        {
          "hora": "Ayer 17:20",
          "de": "ciudadano",
          "texto": "Os confirmo que mañana vamos 9 personas al centro de día, ida a las 9:10 y vuelta a las 16:20. Gracias."
        },
        {"hora": "Ayer 17:45", "de": "operador", "texto": "Confirmado, Pilar. Mañana irá un vehículo de 19 plazas con rampa."}
      ]
    },
    {
      "id": "cv5",
      "usuario": "u03",
      "canal": "chat web",
      "hora": "09:31",
      "estado": "Abierta",
      "asunto": "Aviso de retraso",
      "mensajes": [
        {"hora": "09:31", "de": "sistema", "texto": "Aviso enviado: la ruta R2 lleva 12 minutos de retraso por obras. Recogida estimada a las 09:42."},
        {"hora": "09:33", "de": "ciudadano", "texto": "Entonces espero en el consultorio, ¿verdad?"},
        {"hora": "09:34", "de": "operador", "texto": "Sí, Tomás. Espere dentro del consultorio, el vehículo le avisará al llegar."}
      ]
    }
  ],
  "reclamaciones": [
    {
      "id": "REC-0057",
      "usuario": "u01",
      "fecha": "2026-03-09",
      "tipo": "Puntualidad",
      "estado": "Resuelta",
      "texto": "El vehículo llegó 20 minutos tarde y perdí la cita del médico.",
      "respuesta": "Disculpas por el retraso. Se debió a una avería. Le hemos reprogramado la cita con el centro de salud y abonado el viaje.",
      "resolucion": "2026-03-11"
    }
  ],
  "encuestas": [
    {"usuario": "u01", "fecha": "2026-04-07", "tipo": "NPS", "pregunta": "¿Recomendaría el servicio a un familiar o vecino?", "valor": 9, "escala": 10},
    {"usuario": "u01", "fecha": "2026-04-07", "tipo": "Puntualidad", "pregunta": "¿Cómo valora la puntualidad?", "valor": 4, "escala": 5},
    {"usuario": "u01", "fecha": "2026-04-07", "tipo": "Trato", "pregunta": "¿Cómo valora el trato del personal?", "valor": 5, "escala": 5}
  ],
  "satisfaccion": {"media": 4.6, "escala": 5, "nps": 52, "respuestas": 214},
  "informes": [
    {
      "id": "inf1",
      "nombre": "Informe mensual · marzo 2026",
      "plantilla": "Mensual",
      "fecha": "2026-04-02",
      "formato": "PDF",
      "destinatarios": "Pleno de Valdecerro"
    },
    {
      "id": "inf2",
      "nombre": "Informe semanal · semana 14",
      "plantilla": "Semanal",
      "fecha": "2026-04-06",
      "formato": "Excel",
      "destinatarios": "Consorcio de Transportes"
    },
    {
      "id": "inf3",
      "nombre": "Informe de impacto · primer trimestre",
      "plantilla": "Impacto",
      "fecha": "2026-04-08",
      "formato": "PDF",
      "destinatarios": "Solicitud FEDER"
    },
    {
      "id": "inf4",
      "nombre": "Informe diario · 13/04/2026",
      "plantilla": "Diario",
      "fecha": "2026-04-14",
      "formato": "PDF",
      "destinatarios": "Centro de control"
    }
  ],
  "informesProgramados": [
    {"nombre": "Informe semanal al consorcio", "frecuencia": "Cada lunes a las 08:00", "destinatarios": "Consorcio de Transportes", "formato": "Excel"},
    {"nombre": "Informe mensual al pleno", "frecuencia": "Día 2 de cada mes", "destinatarios": "Pleno de los 5 ayuntamientos", "formato": "PDF"}
  ],
  "kpisHoy": {"serviciosActivos": 4, "viajerosABordo": 23, "puntualidad": 94, "ocupacionMedia": 61},
  "pantallas": [
    {
      "id": "landing",
      "archivo": "landing.html",
      "nombre": "Landing institucional",
      "modulo": "acceso",
      "grupo": null,
      "descripcion": "Presentación del servicio para la ciudadanía y las administraciones."
    },
    {
      "id": "login",
      "archivo": "login.html",
      "nombre": "Acceso",
      "modulo": "acceso",
      "grupo": null,
      "descripcion": "Acceso con selector de perfil: ciudadano, conductor, operador o administración."
    },
    {
      "id": "viajero-home",
      "archivo": "viajero/home.html",
      "nombre": "Inicio",
      "modulo": "viajero",
      "grupo": "Portal del viajero",
      "descripcion": "Inicio de Josefa: reservar, su próximo viaje y avisos del día."
    },
    {
      "id": "viajero-registro",
      "archivo": "viajero/registro.html",
      "nombre": "Registro",
      "modulo": "viajero",
      "grupo": "Portal del viajero",
      "descripcion": "Alta de un nuevo viajero en tres pasos, con perfil especial."
    },
    {
      "id": "viajero-reservar",
      "archivo": "viajero/reservar.html",
      "nombre": "Reservar un viaje",
      "modulo": "viajero",
      "grupo": "Portal del viajero",
      "descripcion": "Reserva completa en cuatro pasos con tarifa calculada."
    },
    {
      "id": "viajero-seguimiento",
      "archivo": "viajero/seguimiento.html",
      "nombre": "Seguimiento del viaje",
      "modulo": "viajero",
      "grupo": "Portal del viajero",
      "descripcion": "El vehículo en el mapa y la hora estimada de llegada."
    },
    {
      "id": "viajero-mis-viajes",
      "archivo": "viajero/mis-viajes.html",
      "nombre": "Mis viajes",
      "modulo": "viajero",
      "grupo": "Portal del viajero",
      "descripcion": "Próximos viajes, historial, recurrentes y bonificaciones."
    },
    {
      "id": "app-viajero-onboarding",
      "archivo": "app-viajero/onboarding.html",
      "nombre": "Bienvenida",
      "modulo": "viajero",
      "grupo": "App del viajero",
      "descripcion": "Bienvenida a la app en tres pantallas."
    },
    {
      "id": "app-viajero-home",
      "archivo": "app-viajero/home.html",
      "nombre": "Inicio",
      "modulo": "viajero",
      "grupo": "App del viajero",
      "descripcion": "Reserva rápida y próximo viaje desde el móvil."
    },
    {
      "id": "app-viajero-confirmacion",
      "archivo": "app-viajero/confirmacion.html",
      "nombre": "Reserva confirmada",
      "modulo": "viajero",
      "grupo": "App del viajero",
      "descripcion": "Reserva confirmada con código QR."
    },
    {
      "id": "app-viajero-seguimiento",
      "archivo": "app-viajero/seguimiento.html",
      "nombre": "Seguimiento",
      "modulo": "viajero",
      "grupo": "App del viajero",
      "descripcion": "Seguimiento del vehículo a pantalla completa."
    },
    {
      "id": "app-viajero-perfil",
      "archivo": "app-viajero/perfil.html",
      "nombre": "Perfil",
      "modulo": "viajero",
      "grupo": "App del viajero",
      "descripcion": "Datos, bonificación, pagos y accesibilidad."
    },
    {
      "id": "app-conductor-servicios",
      "archivo": "app-conductor/servicios.html",
      "nombre": "Servicios del día",
      "modulo": "conductor",
      "grupo": "App del conductor",
      "descripcion": "Servicios del día de la conductora."
    },
    {
      "id": "app-conductor-navegacion",
      "archivo": "app-conductor/navegacion.html",
      "nombre": "Navegación",
      "modulo": "conductor",
      "grupo": "App del conductor",
      "descripcion": "Ruta y próxima parada, pensada para conducir."
    },
    {
      "id": "app-conductor-recogida",
      "archivo": "app-conductor/recogida.html",
      "nombre": "Recogida de viajeros",
      "modulo": "conductor",
      "grupo": "App del conductor",
      "descripcion": "Validación de viajeros en la parada."
    },
    {
      "id": "app-conductor-incidencias",
      "archivo": "app-conductor/incidencias.html",
      "nombre": "Incidencias",
      "modulo": "conductor",
      "grupo": "App del conductor",
      "descripcion": "Aviso de incidencias y chat con la central."
    },
    {
      "id": "control-mapa",
      "archivo": "control/mapa.html",
      "nombre": "Centro de control",
      "modulo": "control",
      "grupo": "Operación",
      "descripcion": "Mapa en vivo de vehículos, rutas, paradas y alertas."
    },
    {
      "id": "control-incidencias",
      "archivo": "control/incidencias.html",
      "nombre": "Incidencias",
      "modulo": "control",
      "grupo": "Operación",
      "descripcion": "Gestión de incidencias y sustituciones."
    },
    {
      "id": "motor-rutas",
      "archivo": "motor/rutas.html",
      "nombre": "Rutas del día",
      "modulo": "motor",
      "grupo": "Planificación",
      "descripcion": "Planificación del día: 24 reservas agrupadas en 4 rutas."
    },
    {
      "id": "motor-reglas",
      "archivo": "motor/reglas.html",
      "nombre": "Reglas operativas",
      "modulo": "motor",
      "grupo": "Planificación",
      "descripcion": "Reglas operativas e IA responsable."
    },
    {
      "id": "crm-bandeja",
      "archivo": "crm/bandeja.html",
      "nombre": "Bandeja",
      "modulo": "crm",
      "grupo": "Atención ciudadana",
      "descripcion": "Atención multicanal: teléfono, WhatsApp, correo y chat."
    },
    {
      "id": "crm-usuario",
      "archivo": "crm/usuario.html",
      "nombre": "Ficha de usuario",
      "modulo": "crm",
      "grupo": "Atención ciudadana",
      "descripcion": "Ficha completa de un viajero."
    },
    {
      "id": "flota-vehiculos",
      "archivo": "flota/vehiculos.html",
      "nombre": "Vehículos",
      "modulo": "flota",
      "grupo": "Flota",
      "descripcion": "Estado de los 6 vehículos de la flota."
    },
    {
      "id": "flota-vehiculo",
      "archivo": "flota/vehiculo.html",
      "nombre": "Ficha de vehículo",
      "modulo": "flota",
      "grupo": "Flota",
      "descripcion": "Ficha, telemetría y mantenimiento de un vehículo."
    },
    {
      "id": "economica-tarifas",
      "archivo": "economica/tarifas.html",
      "nombre": "Tarifas",
      "modulo": "economica",
      "grupo": "Económica",
      "descripcion": "Tarifas, bonificaciones y simulador."
    },
    {
      "id": "economica-facturacion",
      "archivo": "economica/facturacion.html",
      "nombre": "Facturación",
      "modulo": "economica",
      "grupo": "Económica",
      "descripcion": "Facturas y liquidación mensual."
    },
    {
      "id": "admin-cuadro-mando",
      "archivo": "admin/cuadro-mando.html",
      "nombre": "Cuadro de mando",
      "modulo": "admin",
      "grupo": "Administración",
      "descripcion": "Indicadores ejecutivos para la concejalía."
    },
    {
      "id": "admin-territorio",
      "archivo": "admin/territorio.html",
      "nombre": "Territorio",
      "modulo": "admin",
      "grupo": "Administración",
      "descripcion": "Municipios, paradas, cobertura y zonas."
    },
    {
      "id": "bi-dashboard",
      "archivo": "bi/dashboard.html",
      "nombre": "Dashboard",
      "modulo": "bi",
      "grupo": "Análisis",
      "descripcion": "Análisis de demanda, ocupación y sostenibilidad."
    },
    {
      "id": "bi-informes",
      "archivo": "bi/informes.html",
      "nombre": "Informes",
      "modulo": "bi",
      "grupo": "Análisis",
      "descripcion": "Generador de informes periódicos."
    }
  ]
}/*DATOS-FIN*/;

  /* ---------------- Utilidades internas ---------------- */
  function porId(lista, campo) {
    var m = {};
    lista.forEach(function (x) { m[x[campo]] = x; });
    return m;
  }
  function minutos(hhmm) {
    var p = String(hhmm).split(":");
    return parseInt(p[0], 10) * 60 + parseInt(p[1], 10);
  }

  var idx = {
    municipio: porId(DATOS.municipios, "id"),
    nucleo: porId(DATOS.nucleos, "id"),
    parada: porId(DATOS.paradas, "id"),
    vehiculo: porId(DATOS.vehiculos, "matricula"),
    conductor: porId(DATOS.conductores, "id"),
    usuario: porId(DATOS.usuarios, "id"),
    ruta: porId(DATOS.rutas, "id"),
    reserva: porId(DATOS.reservas, "codigo"),
    incidencia: porId(DATOS.incidencias, "id"),
    personal: porId(DATOS.personal, "id")
  };
  var bonificacionPct = {};
  DATOS.tarifas.bonificaciones.forEach(function (b) { bonificacionPct[b.perfil] = b.pct; });
  bonificacionPct.general = 0;

  /* ---------------- Formato (castellano de España) ---------------- */
  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  var DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
  function dosDig(n) { return (n < 10 ? "0" : "") + n; }
  function aFecha(iso) { var p = iso.split("-"); return new Date(+p[0], +p[1] - 1, +(p[2] || 1)); }

  /* Número con coma decimal y punto de miles también en 4 cifras (2.912,40), para que
     las cifras de una misma tabla se lean igual. No depende del navegador. */
  function conMiles(n, minDec, maxDec) {
    var v = Number(n), neg = v < 0;
    var t = Math.abs(v).toFixed(maxDec);
    if (maxDec > minDec) t = t.replace(new RegExp("0{1," + (maxDec - minDec) + "}$"), "").replace(/\.$/, "");
    var partes = t.split(".");
    partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return (neg ? "−" : "") + partes.join(",");
  }

  var fmt = {
    /** 1.1 → "1,10 €" ; 2912.4 → "2.912,40 €" */
    euros: function (n) { return conMiles(n, 2, 2) + " €"; },
    /** 4800 → "4.800" ; 4.6 → "4,6" (con dec=1) */
    numero: function (n, dec) { return conMiles(n, dec || 0, dec || 0); },
    /** 94 → "94 %" (con espacio, como en España) */
    porcentaje: function (n, dec) { return fmt.numero(n, dec) + " %"; },
    /** "09:40" → "09:40" ; 580 → "09:40" */
    hora: function (h) { return typeof h === "number" ? dosDig(Math.floor(h / 60)) + ":" + dosDig(h % 60) : h; },
    /** "2026-04-14" → "14/04/2026" */
    fecha: function (iso) { var p = iso.split("-"); return p[2] + "/" + p[1] + "/" + p[0]; },
    /** "2026-04-14" → "martes, 14 de abril de 2026" */
    fechaLarga: function (iso) { var d = aFecha(iso); return DIAS[d.getDay()] + ", " + d.getDate() + " de " + MESES[d.getMonth()] + " de " + d.getFullYear(); },
    /** "2026-04-14" → "14 abr" */
    fechaCorta: function (iso) { var d = aFecha(iso); return d.getDate() + " " + MESES[d.getMonth()].slice(0, 3); },
    /** "2026-03" → "marzo 2026" */
    mes: function (ym) { var d = aFecha(ym + "-01"); return MESES[d.getMonth()] + " " + d.getFullYear(); },
    /** "2026-03" → "mar" */
    mesCorto: function (ym) { return MESES[aFecha(ym + "-01").getMonth()].slice(0, 3); },
    /** 148320 → "148.320 km" */
    km: function (n) { return fmt.numero(n) + " km"; },
    /** Estado → variante de .c-badge */
    estado: function (estado) {
      var e = String(estado).toLowerCase();
      if (/(en servicio|confirmada|pagada|resuelta|en ruta|aprobada|cerrada)/.test(e)) return "success";
      if (/(retraso|pendiente|en revisión|abierta|mantenimiento|descanso)/.test(e)) return "warning";
      if (/(incidencia|cancelada|vencida|avería)/.test(e)) return "danger";
      if (/(programada|en curso|disponible)/.test(e)) return "info";
      return "neutral";
    },
    /** Texto + clase de badge listos para pintar */
    badge: function (estado) {
      return '<span class="c-badge c-badge--' + fmt.estado(estado) + '">' + estado + "</span>";
    },
    iniciales: function (nombre) {
      return nombre.split(/\s+/).slice(0, 2).map(function (w) { return w.charAt(0); }).join("").toUpperCase();
    },
    /** Escapa texto para meterlo en HTML */
    html: function (s) {
      return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
      });
    }
  };

  /* ---------------- API pública ---------------- */
  var TAD = DATOS;

  TAD.ahora = DATOS.meta.ahora;
  TAD.ahoraSeguimiento = DATOS.meta.ahoraSeguimiento;
  TAD.fecha = DATOS.meta.fecha;
  TAD.fmt = fmt;
  TAD.minutos = minutos;

  /** Hora que corresponde a la página actual (body[data-momento="seguimiento"] → 10:08). */
  TAD.momento = function () {
    var b = document.body;
    return b && b.getAttribute("data-momento") === "seguimiento" ? TAD.ahoraSeguimiento : TAD.ahora;
  };

  TAD.municipio = function (id) { return idx.municipio[id]; };
  TAD.nucleo = function (id) { return idx.nucleo[id]; };
  TAD.parada = function (id) { return idx.parada[id]; };
  TAD.vehiculo = function (matricula) { return idx.vehiculo[matricula]; };
  TAD.conductor = function (id) { return idx.conductor[id]; };
  TAD.usuario = function (id) { return idx.usuario[id]; };
  TAD.ruta = function (id) { return idx.ruta[id]; };
  TAD.reserva = function (codigo) { return idx.reserva[codigo]; };
  TAD.incidencia = function (id) { return idx.incidencia[id]; };
  TAD.persona = function (id) { return idx.personal[id]; };
  TAD.servicio = function (id) {
    var ruta = idx.ruta[id.split("-")[0]];
    return ruta && ruta.servicios.filter(function (s) { return s.id === id; })[0];
  };

  /** Reserva de referencia de la maqueta (Josefa Martín). */
  TAD.reservaReferencia = function () { return idx.reserva[DATOS.meta.reservaReferencia]; };

  /** Reservas de un usuario, ordenadas por hora. */
  TAD.reservasDe = function (usuarioId) {
    return DATOS.reservas.filter(function (r) { return r.usuario === usuarioId; })
      .sort(function (a, b) { return minutos(a.horaPrevista) - minutos(b.horaPrevista); });
  };

  /** Reservas de una ruta (o de un servicio, p. ej. "R2-2"). */
  TAD.reservasDeRuta = function (id) {
    return DATOS.reservas.filter(function (r) { return r.ruta === id || r.servicio === id; });
  };

  /** Viajeros que suben y bajan en una parada de una ruta: { suben: [reservas], bajan: [reservas] } */
  TAD.viajerosEnParada = function (rutaId, paradaId, servicioId) {
    var out = { suben: [], bajan: [] };
    idx.ruta[rutaId].servicios.forEach(function (s) {
      if (servicioId && s.id !== servicioId) return;
      s.paradas.forEach(function (p) {
        if (p.parada !== paradaId) return;
        p.suben.forEach(function (c) { out.suben.push(idx.reserva[c]); });
        p.bajan.forEach(function (c) { out.bajan.push(idx.reserva[c]); });
      });
    });
    return out;
  };

  /** Suma de viajeros de una lista de reservas. */
  TAD.suma = function (reservas) { return reservas.reduce(function (n, r) { return n + r.viajeros; }, 0); };

  /** Viajeros a bordo de una ruta a una hora ("09:40" por defecto). */
  TAD.aBordo = function (rutaId, hora) {
    var t = minutos(hora || TAD.momento()), n = 0;
    idx.ruta[rutaId].servicios.forEach(function (s) {
      s.paradas.forEach(function (p) {
        if (minutos(p.estimada) <= t) n += TAD.suma(p.suben.map(TAD.reserva)) - TAD.suma(p.bajan.map(TAD.reserva));
      });
    });
    return n;
  };

  /** Estado de una parada de la ruta a la hora dada: "realizada", "proxima" o "pendiente". */
  TAD.estadoParada = function (servicio, i, hora) {
    var t = minutos(hora || TAD.momento()), p = servicio.paradas;
    if (minutos(p[i].estimada) <= t) return "realizada";
    for (var j = 0; j < p.length; j++) if (minutos(p[j].estimada) > t) return j === i ? "proxima" : "pendiente";
    return "pendiente";
  };

  /** Servicio activo (o el siguiente) de una ruta a la hora dada. */
  TAD.servicioActual = function (rutaId, hora) {
    var t = minutos(hora || TAD.momento()), ss = idx.ruta[rutaId].servicios;
    for (var i = 0; i < ss.length; i++) {
      if (minutos(ss[i].fin) >= t) return ss[i];
    }
    return ss[ss.length - 1];
  };

  /** Tarifa unitaria según origen, destino y perfil. Devuelve { base, pct, importe, interzona }. */
  TAD.tarifa = function (origenId, destinoId, perfil) {
    var o = idx.parada[origenId], d = idx.parada[destinoId];
    var interzona = o.zona !== d.zona;
    var base = interzona ? DATOS.tarifas.precios[1].importe : DATOS.tarifas.precios[0].importe;
    var pct = bonificacionPct[perfil || "general"] || 0;
    return { base: base, pct: pct, importe: Math.round(base * (100 - pct)) / 100, interzona: interzona };
  };

  /** Conteos de flota calculados a partir de la lista de vehículos. */
  TAD.flota = function () {
    var v = DATOS.vehiculos;
    return {
      total: v.length,
      enServicio: v.filter(function (x) { return x.estado === "En servicio"; }).length,
      mantenimiento: v.filter(function (x) { return x.estado === "Mantenimiento"; }).length,
      reserva: v.filter(function (x) { return x.estado === "Reserva"; }).length,
      pmr: v.filter(function (x) { return x.pmr; }).length
    };
  };

  /** Etiqueta de estado de un vehículo para mostrar ("En servicio (sustitución)"). */
  TAD.estadoVehiculo = function (v) { return v.subestado ? v.estado + " (" + v.subestado.toLowerCase() + ")" : v.estado; };

  /** Resumen de reservas del día por estado. */
  TAD.reservasPorEstado = function () {
    var m = {};
    DATOS.reservas.forEach(function (r) { m[r.estado] = (m[r.estado] || 0) + 1; });
    return m;
  };

  /** Totales de una lista de días del historial. */
  TAD.totales = function (dias) {
    dias = dias || DATOS.historial;
    var t = { viajes: 0, viajeros: 0, km: 0, co2: 0 };
    dias.forEach(function (d) { t.viajes += d.viajes; t.viajeros += d.viajeros; t.km += d.km; t.co2 += d.co2; });
    t.co2 = Math.round(t.co2);
    return t;
  };

  window.TAD = TAD;
})();
