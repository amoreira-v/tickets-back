import { Request, Response } from 'express';
import { OptionService } from '../services/OptionService';
import { catchAsync } from '../utils/catchAsync';

const optionService = new OptionService();

export class OptionController {
  getAll = catchAsync(async (req: Request, res: Response) => {
    const options = await optionService.findAll();
    return res.status(200).json({ status: 'success', data: options });
  });

  getById = catchAsync(async (req: Request, res: Response) => {
    const option = await optionService.findById(req.params.id as string);
    return res.status(200).json({ status: 'success', data: option });
  });

  create = catchAsync(async (req: Request, res: Response) => {
    const option = await optionService.create(req.body);
    return res.status(201).json({ status: 'success', data: option });
  });

  update = catchAsync(async (req: Request, res: Response) => {
    const option = await optionService.update(req.params.id as string, req.body);
    return res.status(200).json({ status: 'success', data: option });
  });

  delete = catchAsync(async (req: Request, res: Response) => {
    const result = await optionService.delete(req.params.id as string);
    return res.status(200).json({ status: 'success', data: result });
  });
}
