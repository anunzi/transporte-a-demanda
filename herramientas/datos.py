"""Comprueba que las cuentas de tad-mockup/js/data.js cierran.

Uso:  python herramientas/datos.py

Lee el bloque JSON entre /*DATOS-INICIO*/ y /*DATOS-FIN*/ y revisa, por su cuenta
(sin fiarse de los campos calculados), que la «historia» del 14/04/2026 sea coherente:
conteos del brief, viajeros a bordo, plazas, referencias, importes y liquidación.
Sale con código 1 si algo no cuadra.
"""
import json
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
DATA = RAIZ / "tad-mockup" / "js" / "data.js"

errores = []
comprobadas = 0


def check(cond, msg):
    global comprobadas
    comprobadas += 1
    if not cond:
        errores.append(msg)


def minutos(h):
    a, b = h.split(":")
    return int(a) * 60 + int(b)


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    texto = DATA.read_text(encoding="utf-8")
    m = re.search(r"/\*DATOS-INICIO\*/(.*?)/\*DATOS-FIN\*/", texto, re.S)
    if not m:
        print("No encuentro el bloque de datos en data.js")
        sys.exit(1)
    D = json.loads(m.group(1))

    mun = {x["id"]: x for x in D["municipios"]}
    nuc = {x["id"]: x for x in D["nucleos"]}
    par = {x["id"]: x for x in D["paradas"]}
    veh = {x["matricula"]: x for x in D["vehiculos"]}
    con = {x["id"]: x for x in D["conductores"]}
    usu = {x["id"]: x for x in D["usuarios"]}
    rut = {x["id"]: x for x in D["rutas"]}
    res = {x["codigo"]: x for x in D["reservas"]}
    bon = {b["perfil"]: b["pct"] for b in D["tarifas"]["bonificaciones"]}
    bon["general"] = 0
    ahora = minutos(D["meta"]["ahora"])
    seguimiento = minutos(D["meta"]["ahoraSeguimiento"])

    # --- Territorio (brief 6.1) ---
    check(len(D["municipios"]) == 5, f"Hay {len(D['municipios'])} municipios; el brief pide 5.")
    check(len(D["nucleos"]) == 12, f"Hay {len(D['nucleos'])} núcleos; el brief pide 12.")
    check(len(D["paradas"]) == 18, f"Hay {len(D['paradas'])} paradas; el brief pide 18.")
    for n in D["nucleos"]:
        check(n["municipio"] in mun, f"El núcleo {n['id']} apunta a un municipio que no existe.")
    for p in D["paradas"]:
        check(p["nucleo"] in nuc, f"La parada {p['id']} apunta a un núcleo que no existe.")
        check(p["tipo"] in ("fija", "virtual", "intercambiador"), f"La parada {p['id']} tiene un tipo raro: {p['tipo']}.")
        check(p["zona"] == ("A" if p["municipio"] == "valdecerro" else "B"), f"La parada {p['id']} tiene mal la zona tarifaria.")
        la, lo = p["coord"]
        check(40.75 < la < 41.05 and -3.75 < lo < -3.45, f"La parada {p['id']} cae lejos de la comarca ({la}, {lo}).")
    for mid, m_ in mun.items():
        hab = sum(n["habitantes"] for n in D["nucleos"] if n["municipio"] == mid)
        check(hab == m_["habitantes"], f"{m_['nombre']}: los núcleos suman {hab} habitantes y el municipio dice {m_['habitantes']}.")

    # --- Flota y conductores (brief 6.2, 6.3 y decisión del 9951 KZD) ---
    check(len(D["vehiculos"]) == 6, "La flota no tiene 6 vehículos.")
    estados = [v["estado"] for v in D["vehiculos"]]
    check(estados.count("En servicio") == 5, f"Vehículos en servicio: {estados.count('En servicio')}; deben ser 5.")
    check(estados.count("Mantenimiento") == 1, "Debe haber 1 vehículo en mantenimiento.")
    check(estados.count("Reserva") == 0, "No debe quedar ningún vehículo en reserva (el 9951 KZD sustituye al 6604 LBC).")
    check(sum(v["pmr"] for v in D["vehiculos"]) == 3, "Deben ser 3 vehículos adaptados PMR.")
    check(veh["6604 LBC"]["estado"] == "Mantenimiento", "El 6604 LBC debe estar en mantenimiento.")
    check(veh["9951 KZD"].get("subestado") == "Sustitución", "El 9951 KZD debe figurar como sustitución.")
    check(len(D["conductores"]) == 5, "Debe haber 5 conductores.")
    for c in D["conductores"]:
        check(c["vehiculoHoy"] in veh, f"{c['nombre']} tiene asignado un vehículo que no existe.")
        check(c["estado"] in ("En ruta", "Disponible", "Descanso"), f"{c['nombre']} tiene un estado raro.")

    # --- Usuarios (brief 6.4) ---
    check(len(D["usuarios"]) == 12, "Debe haber 12 usuarios.")
    perfiles = [u["perfil"] for u in D["usuarios"]]
    for perfil, n in (("mayor", 4), ("PMR", 2), ("estudiante", 3), ("general", 3)):
        check(perfiles.count(perfil) == n, f"Usuarios con perfil {perfil}: {perfiles.count(perfil)}; deben ser {n}.")
    letras = "TRWAGMYFPDXBNJZSQVHLCKE"
    for u in D["usuarios"]:
        check(u["municipio"] in mun and u["nucleo"] in nuc, f"{u['nombre']} apunta a un municipio o núcleo que no existe.")
        dni = u["dni"]
        check(re.fullmatch(r"\d{8}[A-Z]", dni) is not None, f"El DNI de {u['nombre']} no tiene el formato 00000000X.")
        check(letras[int(dni[:8]) % 23] != dni[8], f"El DNI de {u['nombre']} es válido y debe ser inválido a propósito.")
        check(re.fullmatch(r"6XX XXX \d{3}", u["telefono"]) is not None, f"El teléfono de {u['nombre']} no está oculto.")

    # --- Rutas ---
    check(len(D["rutas"]) == 4, "Debe haber 4 rutas planificadas.")
    for r in D["rutas"]:
        check(r["vehiculo"] in veh and veh[r["vehiculo"]]["estado"] == "En servicio", f"{r['id']}: vehículo inexistente o fuera de servicio.")
        check(r["conductor"] in con, f"{r['id']}: conductor inexistente.")
        for s in r["servicios"]:
            horas = [minutos(p["estimada"]) for p in s["paradas"]]
            check(horas == sorted(horas), f"{s['id']}: las horas estimadas no van en orden.")
            for p in s["paradas"]:
                check(p["parada"] in par, f"{s['id']}: parada {p['parada']} inexistente.")
                check(minutos(p["estimada"]) == minutos(p["prevista"]) + p["retraso"], f"{s['id']} {p['parada']}: estimada ≠ prevista + retraso.")
            # Plazas: en ningún tramo se superan
            dentro = 0
            for p in s["paradas"]:
                dentro += sum(res[c]["viajeros"] for c in p["suben"]) - sum(res[c]["viajeros"] for c in p["bajan"])
                check(0 <= dentro <= veh[r["vehiculo"]]["plazas"], f"{s['id']} en {p['parada']}: {dentro} a bordo con {veh[r['vehiculo']]['plazas']} plazas.")
            check(dentro == 0, f"{s['id']}: al final del servicio quedan {dentro} viajeros a bordo.")

    # --- Reservas (brief 6.5) ---
    check(len(D["reservas"]) == 24, f"Hay {len(D['reservas'])} reservas; deben ser 24.")
    est = [x["estado"] for x in D["reservas"]]
    for e, n in (("Finalizada", 9), ("En curso", 6), ("Confirmada", 7), ("Cancelada", 1), ("Pendiente", 1)):
        check(est.count(e) == n, f"Reservas {e}: {est.count(e)}; deben ser {n}.")
    for x in D["reservas"]:
        c = x["codigo"]
        check(re.fullmatch(r"TAD-2026-\d{5}", c) is not None, f"Código de reserva con formato raro: {c}.")
        check(x["usuario"] in usu, f"{c}: usuario inexistente.")
        check(x["origen"] in par and x["destino"] in par, f"{c}: parada de origen o destino inexistente.")
        # Importe = tarifa × viajeros
        o, d = par[x["origen"]], par[x["destino"]]
        base = 1.50 if o["zona"] == d["zona"] else 2.20
        unit = round(base * (100 - bon[x["perfil"]]) / 100, 2)
        check(abs(x["tarifaUnitaria"] - unit) < 0.005, f"{c}: tarifa unitaria {x['tarifaUnitaria']} y debería ser {unit}.")
        check(abs(x["importe"] - round(unit * x["viajeros"], 2)) < 0.005, f"{c}: el importe no es tarifa × viajeros.")
        if x["estado"] in ("Cancelada", "Pendiente"):
            continue
        check(x["ruta"] in rut, f"{c}: ruta inexistente.")
        serv = next((s for s in rut[x["ruta"]]["servicios"] if s["id"] == x["servicio"]), None)
        check(serv is not None, f"{c}: servicio {x['servicio']} inexistente.")
        if not serv:
            continue
        ps = serv["paradas"]
        io = next((i for i, p in enumerate(ps) if p["parada"] == x["origen"] and c in p["suben"]), None)
        idd = next((i for i, p in enumerate(ps) if p["parada"] == x["destino"] and c in p["bajan"]), None)
        check(io is not None and idd is not None and io < idd, f"{c}: no sube en su origen o no baja en su destino (o en mal orden).")
        if io is None or idd is None:
            continue
        # Estado coherente con la hora de las 09:40
        t_sube, t_baja = minutos(ps[io]["estimada"]), minutos(ps[idd]["estimada"])
        esperado = "Finalizada" if t_baja <= ahora else ("En curso" if t_sube <= ahora else "Confirmada")
        check(x["estado"] == esperado, f"{c}: figura «{x['estado']}» pero a las 09:40 debería estar «{esperado}».")
    # Cada código que aparece en una parada existe y está en un solo sitio
    vistos = []
    for r in D["rutas"]:
        for s in r["servicios"]:
            for p in s["paradas"]:
                for cod in p["suben"]:
                    check(cod in res and res[cod]["servicio"] == s["id"], f"{s['id']}: la reserva {cod} sube aquí pero no es de este servicio.")
                    vistos.append(cod)
    check(len(vistos) == len(set(vistos)), "Hay reservas que suben dos veces.")

    # --- A bordo a las 09:40 y a las 10:08 ---
    def a_bordo(r, t):
        n = 0
        for s in r["servicios"]:
            for p in s["paradas"]:
                if minutos(p["estimada"]) <= t:
                    n += sum(res[c]["viajeros"] for c in p["suben"]) - sum(res[c]["viajeros"] for c in p["bajan"])
        return n
    esperado_ruta = {"R1": 6, "R2": 5, "R3": 9, "R4": 3}
    for rid, n in esperado_ruta.items():
        check(a_bordo(rut[rid], ahora) == n, f"{rid}: {a_bordo(rut[rid], ahora)} a bordo a las 09:40; el plan dice {n}.")
        check(rut[rid]["aBordo"] == n, f"{rid}: el campo aBordo no coincide con el cálculo.")
    en_curso = [x for x in D["reservas"] if x["estado"] == "En curso"]
    check(sum(x["viajeros"] for x in en_curso) == 23, "Las reservas en curso no suman 23 viajeros.")
    for rid, n in esperado_ruta.items():
        s = sum(x["viajeros"] for x in en_curso if x["ruta"] == rid)
        check(s == n, f"{rid}: las reservas en curso suman {s} y a bordo hay {n}.")
    check(D["kpisHoy"]["viajerosABordo"] == 23 and D["kpisHoy"]["serviciosActivos"] == 4, "Los indicadores del día no son 4 servicios y 23 viajeros.")
    r2 = rut["R2"]
    check(a_bordo(r2, seguimiento) == 7, "A las 10:08 la R2 debe llevar 7 viajeros (7/16).")
    check(r2["seguimiento"]["proximaParada"] == "P14" and r2["seguimiento"]["minutos"] == 4, "A las 10:08 la R2 debe estar a 4 min de Navalespino.")
    check(r2["proximaParada"] == "P11" and r2["minutosProxima"] == 2, "A las 09:40 la R2 debe estar a 2 min del Consultorio (Santa Olalla).")
    cons = next(p for p in r2["servicios"][1]["paradas"] if p["parada"] == "P11")
    check(sum(res[c]["viajeros"] for c in cons["suben"]) == 3 and sum(res[c]["viajeros"] for c in cons["bajan"]) == 1,
          "En el Consultorio (Santa Olalla) deben subir 3 y bajar 1.")

    # --- Reserva de referencia ---
    ref = res.get(D["meta"]["reservaReferencia"])
    check(ref is not None, "No existe la reserva de referencia.")
    if ref:
        check(usu[ref["usuario"]]["nombre"] == "Josefa Martín Ruiz", "La reserva de referencia no es de Josefa Martín Ruiz.")
        check(ref["ruta"] == "R2" and rut["R2"]["vehiculo"] == "4521 LKT" and con[rut["R2"]["conductor"]]["nombre"] == "Carmen Ortega",
              "La reserva de referencia debe ir en la R2, con el 4521 LKT y Carmen Ortega.")
        check(abs(ref["importe"] - 1.10) < 0.005, "La reserva de referencia debe costar 1,10 €.")
        p = next(p for p in r2["servicios"][1]["paradas"] if p["parada"] == ref["origen"])
        check(p["prevista"] == "10:00" and p["estimada"] == "10:12", "Josefa: recogida prevista 10:00 y estimada 10:12.")

    # --- Incidencias (brief 6.5) ---
    hoy = [i for i in D["incidencias"] if i["fecha"] == D["meta"]["fecha"]]
    check(len(hoy) == 2, "Hoy debe haber 2 incidencias.")
    for i in D["incidencias"]:
        check(i["ruta"] in rut and i["vehiculo"] in veh, f"{i['id']}: ruta o vehículo inexistente.")

    # --- Historial y liquidación ---
    check(len(D["historial"]) == 30, "El historial debe tener 30 días.")
    check(D["historial"][-1]["fecha"] == "2026-04-13", "El historial debe acabar el 13/04/2026 (el día anterior).")
    liq = D["liquidacion"]
    for campo, total in (("recaudacion", liq["recaudacionUsuarios"]), ("bonificaciones", liq["bonificacionesSubvencionadas"]),
                         ("aportacion", liq["aportacionMunicipal"]), ("viajeros", liq["viajeros"])):
        s = round(sum(x[campo] for x in liq["desglose"]), 2)
        check(abs(s - total) < 0.005, f"Liquidación: el desglose de {campo} suma {s} y el total es {total}.")
    ingresos = round(liq["recaudacionUsuarios"] + liq["bonificacionesSubvencionadas"] + liq["aportacionMunicipal"] + liq["aportacionConsorcio"], 2)
    check(abs(ingresos - liq["ingresos"]) < 0.005, "Liquidación: los ingresos no son la suma de sus partes.")
    check(11000 <= liq["ingresos"] <= 11800 and 2700 <= liq["bonificacionesSubvencionadas"] <= 3100, "Liquidación fuera de lo que pide el brief (≈11.400 € y ≈2.900 €).")
    marzo = next(m for m in D["mensual"] if m["mes"] == "2026-03")
    check(marzo["viajeros"] == liq["viajeros"], "Los viajeros de marzo no coinciden entre la serie mensual y la liquidación.")
    for f in D["facturas"]:
        if f.get("reserva"):
            check(f["reserva"] in res and abs(res[f["reserva"]]["importe"] - f["importe"]) < 0.005, f"Factura {f['numero']}: no coincide con su reserva.")
    check(any(f.get("reserva") == D["meta"]["reservaReferencia"] for f in D["facturas"]), "Falta el recibo de la reserva de referencia.")

    # --- Pantallas ---
    check(len(D["pantallas"]) == 30, f"Hay {len(D['pantallas'])} pantallas en la lista; el inventario tiene 30.")

    for e in errores:
        print("NO CUADRA:", e)
    print(f"\n{comprobadas} comprobaciones, {len(errores)} no cuadran.")
    sys.exit(1 if errores else 0)


if __name__ == "__main__":
    main()
