import { Request, Response } from 'express';
import { ProfileService } from '../services/ProfileService';
import { catchAsync } from '../utils/catchAsync';

const profileService = new ProfileService();

export class ProfileController {
  getAll = catchAsync(async (req: Request, res: Response) => {
    const profiles = await profileService.findAll();
    return res.status(200).json({ status: 'success', data: profiles });
  });

  getById = catchAsync(async (req: Request, res: Response) => {
    const profile = await profileService.findById(req.params.id as string);
    return res.status(200).json({ status: 'success', data: profile });
  });

  create = catchAsync(async (req: Request, res: Response) => {
    const profile = await profileService.create(req.body);
    return res.status(201).json({ status: 'success', data: profile });
  });

  update = catchAsync(async (req: Request, res: Response) => {
    const profile = await profileService.update(req.params.id as string, req.body);
    return res.status(200).json({ status: 'success', data: profile });
  });

  delete = catchAsync(async (req: Request, res: Response) => {
    const result = await profileService.delete(req.params.id as string);
    return res.status(200).json({ status: 'success', data: result });
  });
}
