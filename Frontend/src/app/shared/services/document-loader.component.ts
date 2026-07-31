export class DocumentoLoaderService {


    cargarDocumento(
        id: number,
        service: any,
        callback: any
    ) {

        service.getDocumento(id)
            .subscribe((res: any) => {

                callback(res);

            });

    }


}