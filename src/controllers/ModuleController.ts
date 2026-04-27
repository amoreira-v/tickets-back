import { Request, Response } from 'express';
import { ModuleService } from '../services/ModuleService';
import { catchAsync } from '../utils/catchAsync';

const moduleService = new ModuleService();

export class ModuleController {
  getAll = catchAsync(async (req: Request, res: Response) => {
    const modules = await moduleService.findAll();
    return res.status(200).json({ status: 'success', data: modules });
  });

  getById = catchAsync(async (req: Request, res: Response) => {
    const moduleItem = await moduleService.findById(req.params.id as string);
    return res.status(200).json({ status: 'success', data: moduleItem });
  });

  create = catchAsync(async (req: Request, res: Response) => {
    const moduleItem = await moduleService.create(req.body);
    return res.status(201).json({ status: 'success', data: moduleItem });
  });

  update = catchAsync(async (req: Request, res: Response) => {
    const moduleItem = await moduleService.update(req.params.id as string, req.body);
    return res.status(200).json({ status: 'success', data: moduleItem });
  });

  delete = catchAsync(async (req: Request, res: Response) => {
    const result = await moduleService.delete(req.params.id as string);
    return res.status(200).json({ status: 'success', data: result });
  });
}
