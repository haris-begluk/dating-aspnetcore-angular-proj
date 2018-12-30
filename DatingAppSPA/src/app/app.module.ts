import { PhotoEditorComponent } from "./members/photo-editor/photo-editor.component";
import { PreventUnsavedChanges } from "./_guards/prevent-unsaved-changes.guard";
import { MemberEditComponent } from "./members/member-edit/member-edit.component";
import { MemberListResolver } from "./_resolvers/member-list.resolver";
import { MemberDetailResolver } from "./_resolvers/member-detail.resolver";
import { MemberDetailComponent } from "./members/member-detail/member-detail.component";
import { MemberCardComponent } from "./members/member-card/member-card.component";
import { AuthGuard } from "./_guards/auth.guard";
import { AlertifyService } from "./services/alertify.service";
import { AuthService } from "./services/auth.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { NavComponent } from "./nav/nav.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { ErrorInterceptorProvider } from "./services/error.inteceptor";
import {
  BsDropdownModule,
  TabsModule,
  BsDatepickerModule
} from "ngx-bootstrap";
import { MemberListComponent } from "./members/member-list/member-list.component";
import { ListsComponent } from "./lists/lists.component";
import { MessagesComponent } from "./messages/messages.component";
import { RouterModule } from "@angular/router";
import { appRoutes } from "./routes";
import { UserService } from "./services/user.service";
import { JwtModule } from "@auth0/angular-jwt";
import { NgxGalleryModule } from "ngx-gallery";
import { MemberEditResolver } from "./_resolvers/member-edit.resolver";
import { FileUploadModule } from "ng2-file-upload";

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    PhotoEditorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxGalleryModule,
    FileUploadModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ["localhost:5000"],
        blacklistedRoutes: ["localhost:5000/api/auth"]
      }
    })
  ],
  providers: [
    AuthService,
    ErrorInterceptorProvider,
    AlertifyService,
    AuthGuard,
    UserService,
    MemberDetailResolver,
    MemberListResolver,
    MemberEditResolver,
    PreventUnsavedChanges
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
