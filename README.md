# COPEREX-Administrador

## Descripción
COPEREX-Administrador es una API para la gestión de empresas. Permite registrar, actualizar, eliminar y listar empresas, así como gestionar usuarios administradores y autenticación.

## Instalación
1. Clona el repositorio:
    ```sh
    git clone https://github.com/dannyrodriguez90/COPEREX-Administrador.git
    ```
2. Navega al directorio del proyecto:
    ```sh
    cd COPEREX-Administrador
    ```
3. Instala las dependencias:
    ```sh
    npm install
    ```
4. Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:
    ```env
    PORT=3001
    URI_MONGO=mongodb://localhost:27017/coperex
    KEY=S@lch1P4p4s!2025
    ```

## Uso
1. Inicia el servidor:
    ```sh
    npm run dev
    ```
2. El servidor estará corriendo en `http://localhost:3001`.

## Endpoints
- **Crear empresa**
    ```http
    POST /coperex/v1/empresas/crearEmpresa
    ```
    Cuerpo de la solicitud:
    ```json
    {
        "nombre": "Empresa XYZ",
        "nivelImpacto": "Alto",
        "fechaCreacion": "2020-01-01",
        "categoria": "Tecnología",
        "email": "contacto@empresaxyz.com",
        "phone": "87654321",
        "direccion": "123 Calle Principal"
    }
    ```

- **Actualizar empresa**
    ```http
    PUT /coperex/v1/empresas/actualizarEmpresa/:id
    ```
    Cuerpo de la solicitud:
    ```json
    {
        "nombre": "Empresa2",
        "nivelImpacto": "Alto",
        "fechaCreacion": "2020-01-01",
        "categoria": "Tecnología",
        "email": "empresa@empresaxyz.com",
        "phone": "87654321",
        "direccion": "123 Calle Principal"
    }
    ```

- **Eliminar empresa**
    ```http
    DELETE /coperex/v1/empresas/eliminarEmpresa/:id
    ```

- **Listar empresas**
    ```http
    GET /coperex/v1/empresas
    ```
    Parámetros opcionales:
    - `sort`: Ordenar por nombre (e.g., `nombre:asc` para A-Z, `nombre:desc` para Z-A)

- **Generar archivo Excel de una empresa**
    ```http
    GET /coperex/v1/empresas/generarExcel/:id
    ```
