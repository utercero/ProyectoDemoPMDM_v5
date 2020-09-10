import { Injectable } from "@angular/core";
import { HttpClient,HttpHeaders,HttpErrorResponse} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
// Se importan las clases del modelo necesarias para utilizar en la llamadas <T>
// Incluir la clase no asegura ningun tipo de comprobacion. Si se quiere realizar
// comprobacion de los campos de debe realizar
import { Persona } from "../modelo/persona";

@Injectable({
  providedIn: "root",
})
export class HttpServiceService {
  // url base. Se puede incluir en un fichero de configuración
  base_path = "http://localhost:3000/person";

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }

  createItem(item): Observable<Persona> {
    console.log(item);
    return this.http
      .post<Persona>(this.base_path, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getItem(id): Observable<Persona> {
    return this.http
      .get<Persona>(this.base_path + "/" + id)
      .pipe(retry(2), catchError(this.handleError));
  }

  getList(): Observable<Persona[]> {
    return this.http
      .get<Persona[]>(this.base_path)
      .pipe(retry(2), catchError(this.handleError));
  }

  updateItem(id, item): Observable<Persona> {
    return this.http
      .put<Persona>(
        this.base_path + "/" + id,
        JSON.stringify(item),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteItem(id) {
    return this.http
      .delete<Persona>(this.base_path + "/" + id, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
