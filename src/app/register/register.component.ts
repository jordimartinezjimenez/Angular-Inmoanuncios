import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { IRegister } from '../interfaces/iregister';
import { UsuariosService } from '../services/usuarios.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  hide = true;
  registros: IRegister[] = [];
  registerForm: FormGroup;
  missatge = '';
  match = false;
  errorMessage: string = "Error de proba";
  pattern_password = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,16}$";
  pattern_telefono = "^([+]?\d{1,2}[-\s]?|)[9|6|7][0-9]{8}$";
  errorPassword: string = "La contraseña debe tener al menos entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula y al menos una mayúscula. NO puede tener otros símbolos";

  constructor(private formBuilder: FormBuilder, private usuariosService: UsuariosService, private route: Router, private app: AppComponent) {
    this.registerForm = this.createForm();
  }
  //^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{8,16})\S$
  createForm() {
    return this.formBuilder.group({
      nickname: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.pattern(this.pattern_password)]],
      cpassword: [null, [Validators.required]],
      nombre: [null, [Validators.required]],
      apellidos: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      telefono: [null, [Validators.required, Validators.pattern(this.pattern_telefono)]],
      imagen: [null],
      terminos: [false, Validators.requiredTrue]
    });
  }

  samePassword(){
    const password = this.registerForm.get('password')?.value;
    const cpassword = this.registerForm.get('cpassword')?.value;

    if (password === cpassword) {
      document.getElementById("cpassword")?.setAttribute("class", "border border-success form-control");
      this.registerForm.invalid;
      this.match = true;
    } else {
      document.getElementById("cpassword")?.setAttribute("class", "border border-danger form-control");
      document.getElementById("boton-inmo")?.setAttribute("disabled", "");
      this.match = false;
    }
  }

  ngOnInit(): void {
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.registerForm.get('imagen')?.setValue(file);
    }
  }

  onSubmit() {

    console.log("Dentro: " + this.registerForm.valid);

    if (!this.registerForm.valid && this.match === false) {
      document.getElementById("boton-inmo")?.setAttribute("disabled", "");
      return;
    }

    console.log("Entrando formu");

    const formData = new FormData();

    var nickname = this.registerForm.get('nickname');
    var password = this.registerForm.get('password');
    var nombre = this.registerForm.get('nombre');
    var apellidos = this.registerForm.get('apellidos');
    var email = this.registerForm.get('email');
    var telefono = this.registerForm.get('telefono');
    var imagen = this.registerForm.get('imagen');

    if (nickname) formData.append("nickname", nickname.value);
    if (password) formData.append("password", password.value);
    if (nombre) formData.append("nombre", nombre.value);
    if (apellidos) formData.append("apellidos", apellidos.value);
    if (email) formData.append("email", email.value);
    if (telefono) formData.append("telefono", telefono.value);
    if (imagen) formData.append("imagen", imagen.value);

    formData.forEach((value, key) => {
      console.log(key + " " + value)
    });

    this.missatge = `Usuari inserit correctament`;
    this.registerForm.reset();
    this.usuariosService.postUsuario(formData).subscribe({
      next: (x) => {
        alert(this.missatge);
        this.route.navigate(['../login']);
      }, // Per debuguer
      error: (error) => {
        alert('Error: ' + error.message);
        // podriem treure l'error a html
      }
    });
  }

  noValid(nControl: string): boolean {
    let cc = this.registerForm.get(nControl);
    if (!cc) return true;
    return (!cc.valid &&
      cc.touched);
  }

  getErrorMessage(nControl: string): string {
    const ctl = this.registerForm.get(nControl);

    if (!ctl) return 'Control Erroni';
    let str = '';
    switch (nControl) {
      case 'nickname':
        str = ctl.hasError('required') ? 'Field is required' : '';
        break;
      case 'password':
        str = ctl.hasError('required') ? 'Field is required' :
          ctl.hasError('pattern') ? this.errorPassword : '';
        break;
      case 'cpassword':
        str = ctl.hasError('required') ? 'Field is required' :
        this.match === false ? 'No coinciden' : '';
        break;
      case 'nombre':
        str = ctl.hasError('required') ? 'No coinciden' : '';
        break;
      case 'apellidos':
        str = ctl.hasError('required') ? 'Field is required' : '';
        break;
      case 'email':
        str = ctl.hasError('required') ? 'Field is required' :
          ctl.hasError('email') ? 'Not a valid email' : '';
        break;
      case 'telefono':
        str = ctl.hasError('required') ? 'Field is required' :
          ctl.hasError('pattern') ? 'Es incorrecto el formato' : '';
        break;
      case 'imagen':
        break;
      case 'terminos':
        str = ctl.hasError('required') ? 'Debes aceptar los terminos' : '';
        break;
      default:
        str = 'Control invalid';
    };

    return str;
  }

}
