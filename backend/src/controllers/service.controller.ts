import { Request, Response } from 'express';
import Service from '../models/Service.model';

// Get all services
export const getAllServices = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, isActive } = req.query;
    
    const filter: any = {};
    if (category) filter.category = category;
    if (isActive !== undefined) filter.isActive = isActive === 'true';

    const services = await Service.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: services.length,
      data: services
    });
  } catch (error) {
    console.error('Get services error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch services',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Get single service
export const getService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const service = await Service.findById(id);

    if (!service) {
      res.status(404).json({
        status: 'error',
        message: 'Service not found'
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: service
    });
  } catch (error) {
    console.error('Get service error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch service',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Create service (admin only)
export const createService = async (req: Request, res: Response): Promise<void> => {
  try {
    const serviceData = req.body;
    const service = new Service(serviceData);
    await service.save();

    res.status(201).json({
      status: 'success',
      message: 'Service created successfully',
      data: service
    });
  } catch (error) {
    console.error('Create service error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create service',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Update service (admin only)
export const updateService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const service = await Service.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });

    if (!service) {
      res.status(404).json({
        status: 'error',
        message: 'Service not found'
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      message: 'Service updated successfully',
      data: service
    });
  } catch (error) {
    console.error('Update service error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update service',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Delete service (admin only)
export const deleteService = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const service = await Service.findByIdAndDelete(id);

    if (!service) {
      res.status(404).json({
        status: 'error',
        message: 'Service not found'
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      message: 'Service deleted successfully'
    });
  } catch (error) {
    console.error('Delete service error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete service',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};
