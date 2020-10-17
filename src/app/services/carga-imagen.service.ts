import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../models/file-item';

@Injectable({
    providedIn: 'root'
})
export class CargaImagenService {

    private CARPETA_IMAGENES = 'img';

    constructor(private db: AngularFirestore) { }

    cargarImagenesFirebase(imagenes: FileItem[]) {
        const storageRef = firebase.storage().ref();
        for(const item of imagenes) {
            item.subiendo = true;
            if(item.progreso >= 100) {
                continue;
            }

            const uploadTask: firebase.storage.UploadTask = storageRef.child(`${this.CARPETA_IMAGENES}/${item.nombre}`)
                                                                        .put(item.archivo);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot: firebase.storage.UploadTaskSnapshot) => item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                (err) => console.error('Error al subir', err),
                async () => {
                    console.log('Imagen cargada correctamente');
                    item.url = await uploadTask.snapshot.ref.getDownloadURL();
                    this.guardarReferenciaImagen({
                        nombre: item.nombre, 
                        url: item.url
                    });
                }
            )
        }
    }

    private guardarReferenciaImagen(imagen: {nombre: string, url: string}) {
        console.log('Aca fallas');
        this.db.collection(`/${this.CARPETA_IMAGENES}`)
                .add(imagen);
    }
}
