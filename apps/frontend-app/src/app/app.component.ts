import { Component } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Movies } from "@nestjs-logging-tracing/api-interfaces";

@Component({
  selector: "nestjs-logging-tracing-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public movies$ = this.http.get<Movies>("/api/movies");
  constructor(private http: HttpClient) {}

  public btnCauseError() {
    this.http.post("/api/error", null).subscribe();
  }
}
