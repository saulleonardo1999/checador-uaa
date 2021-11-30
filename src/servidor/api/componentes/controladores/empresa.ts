import { request, Request, Response } from 'express';
import { Empresa, IEmpresa } from '../modelos/empresa.model';

export let obtenerEmpresas = async (req: Request, res: Response) => {
    _obtenerEmpresas(req, res);
}
export let guardarEmpresa = async (req: Request, res: Response) => {
    _guardarEmpresa(req, res);
}
export let editarEmpresa = async (req: Request, res: Response) => {
    _editarEmpresa(req, res);
}
export let eliminarEmpresa = async (req: Request, res: Response) => {
    _eliminarEmpresa(req, res);
}

function _obtenerEmpresas(req: Request, res: Response) {
    Empresa
        .find()
        .populate({ path: 'ubicaciones._idCodigoPostal' })
        .populate({ path: 'ubicaciones._idColonia' })
        .exec((err, empresas: IEmpresa[]) => {
            if (err) res.status(422).send({ titulo: 'Error al obtener las empresas', detalles: 'Ocurrio un error al obtener las empresas, por favor intentalo más tarde' });
            else if (empresas)
                res.send(empresas)
            else res.status(404).send({ titulo: 'Error interno al obtener las empresas', detalles: 'Ocurrio un error interno al obtener las empresas, por favor intentalo más tarde' });
        })
}

function _guardarEmpresa(req: Request, res: Response) {
    let empresa: IEmpresa = new Empresa(req.body);
    empresa.estatus = true;
    empresa.save((err, empresa: IEmpresa) => {
        console.log(err);
        if (err) {
            return res.status(422).send({ titulo: 'Error al guardar la empresa', detalles: 'Ocurrio un error al guardar la empresa, por favor intentalo de nuevo mas tarde' });
        } else if (empresa) {
            return res.status(201).json(empresa);
        } else {
            return res.status(422).send({ titulo: 'Error interno al guardar la empresa', detalles: 'Ocurrio un error interno al guardar la empresa, por favor intentalo de nuevo mas tarde' });
        }
    })
}

async function _editarEmpresa(req: Request, res: Response) {
    const empresa: IEmpresa = (<IEmpresa>req.body);
    try {
        Empresa
            .findByIdAndUpdate({_id: empresa._id}, empresa)
            .exec((err: any, empresa: any) => {
                console.log(err, empresa);
                if (err) {
                    console.log(err);
                    return res.status(422).send({ titulo: 'Error al editar', detalles: "Ocurrió un error al editar, intente por favor más tarde" });
                } else if (empresa) {
                    console.log(empresa);
                    return res.status(200).json(empresa);
                }
            })
    } catch (error: any) {
        console.log(error);
        return res.status(422).send({ titulo: 'Error al editar', detalles: "Ocurrió un error al editar, intente por favor más tarde" });

    }
}
async function _eliminarEmpresa(req: Request, res: Response) {
    let empresa: string = String(req.params.id);
    try {
        Empresa
            .findByIdAndUpdate({_id: empresa}, {estatus: false})
            .exec((err: any, empresa: any) => {
                console.log(err, empresa);
                if (err) {
                    console.log(err);
                    return res.status(422).send({ titulo: 'Error al eliminar', detalles: "Ocurrió un error al eliminar, intente por favor más tarde" });
                } else if (empresa) {
                    console.log(empresa);
                    return res.status(200).json(empresa);
                }
            })
    } catch (error: any) {
        console.log(error);
        return res.status(422).send({ titulo: 'Error al eliminar', detalles: "Ocurrió un error al eliminar, intente por favor más tarde" });

    }
}