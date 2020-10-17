import { Component, OnInit } from '@angular/core';
import { FileItem } from 'src/app/models/file-item';
import { CargaImagenService } from 'src/app/services/carga-imagen.service';

@Component({
    selector: 'app-carga',
    templateUrl: './carga.component.html',
    styles: [
    ]
})
export class CargaComponent implements OnInit {

    estaSobreElemento: boolean = false;
    archivos: FileItem[] = [];


    constructor(private _cargaImagenes: CargaImagenService) { }

    ngOnInit(): void {
    }

    cargarImagenes() {
        this._cargaImagenes.cargarImagenesFirebase(this.archivos);
    }

    limpiarArchivos() {
        this.archivos = [];
    }
}
