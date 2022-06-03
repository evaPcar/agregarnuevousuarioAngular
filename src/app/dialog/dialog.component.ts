import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog'; 



@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  ArraySexo = ["Femenino","Masculino","Otro","No especificado"]
  UsuariosForm! : FormGroup;
  actionBtn : string = "Guardar"
 
  constructor(private formBuider:FormBuilder, 
    private api : ApiService, 
    private dialogRef: MatDialogRef<DialogComponent>,
    @Inject (MAT_DIALOG_DATA) public editData : any) { }

  ngOnInit(): void {
    this.UsuariosForm = this.formBuider.group({
      nombre:["",[Validators.required,Validators.minLength(3)]],
      apellido:["",[Validators.required,Validators.minLength(3)]],
      sexo:["",Validators.required],
      edad:["",[Validators.required,Validators.min(1),Validators.max(125)]],
      dni:["",[Validators.required,Validators.minLength(9),Validators.maxLength(9)]],
      fecha:["",Validators.required,],
      color:["",[Validators.required,Validators.minLength(3)]],
    });

    if(this.editData){
      this.actionBtn = "Editar";
      this.UsuariosForm.controls["nombre"].setValue(this.editData.nombre);
      this.UsuariosForm.controls["apellido"].setValue(this.editData.apellido);
      this.UsuariosForm.controls["sexo"].setValue(this.editData.sexo);
      this.UsuariosForm.controls["edad"].setValue(this.editData.edad);
      this.UsuariosForm.controls["dni"].setValue(this.editData.dni);
      this.UsuariosForm.controls["fecha"].setValue(this.editData.fecha);
      this.UsuariosForm.controls["color"].setValue(this.editData.color);
    }
  }

  agregarUsuario(){
if(!this.editData){
  if(this.UsuariosForm.valid){
    this.api.postUsuario(this.UsuariosForm.value)
    .subscribe({
      next:(res)=> {
          alert('El usuario se ha añadido correctamente')
          this.UsuariosForm.reset();
          this.dialogRef.close('Editar')
          window.location.reload();

          
        },
          error:()=>{
            alert('El usuario no se ha añadido')
          }
        
        });
      
    }
}else{
  this.updateUsuario()

}
  }
updateUsuario(){
this.api.putUsuario(this.UsuariosForm.value, this.editData.id)
.subscribe({
  next:(res)=>{
    alert("El producto ha sido actualizado");
    this.UsuariosForm.reset();
    this.dialogRef.close('Editar');

  },
  error:()=>{
  alert("Error al actualizar el usuario");
}
})
}
 
}

