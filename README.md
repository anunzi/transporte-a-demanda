# Transporte a demanda — maqueta de la Plataforma Digital TAD

Maqueta visual y navegable de la Plataforma Digital TAD (transporte a demanda para zonas rurales), con datos ficticios.

- **Ver la maqueta**: https://dodgerblue-aardvark-898542.hostingersite.com/
- **La maqueta** (lo que se publica): [`tad-mockup/`](tad-mockup/) — cómo está hecha, cómo cambiar marca o datos y el control de calidad en [`tad-mockup/README.md`](tad-mockup/README.md).
- **Documentación del proyecto**: [`docs/`](docs/) — brief original (`punto-de-partida.md`), plan general y por bloques, guía para construir pantallas, tabla de contrastes y bitácora de decisiones.
- **Herramientas** (no se publican): [`herramientas/`](herramientas/) — comprobaciones automáticas (`todo.py` las corre todas), generador de pantallas del backoffice, copia de iconos y script de publicación.

Revisar en local:

```bash
python -m http.server 8765 --directory tad-mockup
```

y abrir http://localhost:8765/.
